import { NextRequest, NextResponse } from 'next/server';

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 10; // 10 code generations per minute

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

const platformPrompts: Record<string, string> = {
  nextjs: `Generate production-ready Next.js 15 code with TypeScript. Include:
- React Server Components where appropriate
- Proper TypeScript types
- Tailwind CSS for styling
- Error handling
- Loading states
- Best practices for Next.js 15

Generate a complete, working component or page.`,
  
  fastapi: `Generate production-ready FastAPI code with Python. Include:
- Type hints
- Pydantic models
- Proper error handling
- API documentation
- Best practices for FastAPI

Generate a complete, working endpoint or module.`,
  
  mobile: `Generate production-ready React Native code with TypeScript. Include:
- Proper TypeScript types
- React Native best practices
- Error handling
- Loading states
- Responsive design

Generate a complete, working screen or component.`,
};

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    const { platform, prompt } = await request.json();

    if (!platform || typeof platform !== 'string') {
      return NextResponse.json(
        { error: 'Platform is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('ANTHROPIC_API_KEY is not set');
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Use require to avoid Next.js bundling issues with zod helpers
    const Anthropic = require('@anthropic-ai/sdk').default;
    const anthropic = new Anthropic({ apiKey });

    const platformPrompt = platformPrompts[platform] || platformPrompts.nextjs;
    const userPrompt = prompt || `Generate a sample ${platform} component/endpoint`;

    const fullPrompt = `${platformPrompt}

User request: ${userPrompt}

Generate the code now. Return ONLY the code, no explanations or markdown formatting.`;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 3000,
      messages: [
        {
          role: 'user',
          content: fullPrompt,
        },
      ],
    });

    const content = response.content[0];
    let code = content.type === 'text' ? content.text : '';

    // Clean up markdown code blocks if present
    code = code.replace(/^```[\w]*\n?/gm, '').replace(/```$/gm, '').trim();

    // Determine language based on platform
    const languages: Record<string, string> = {
      nextjs: 'typescript',
      fastapi: 'python',
      mobile: 'typescript',
    };

    return NextResponse.json({
      code,
      language: languages[platform] || 'typescript',
    });
  } catch (error) {
    console.error('Error in generate-code API:', error);
    
    if (error instanceof Anthropic.APIError) {
      return NextResponse.json(
        { error: `Anthropic API error: ${error.message}` },
        { status: error.status || 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

