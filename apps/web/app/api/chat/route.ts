import { NextRequest, NextResponse } from 'next/server';

// Rate limiting: simple in-memory store (use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 20; // 20 requests per minute

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

    const { message, agentType } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
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

    // Build prompt based on agent type
    const agentPrompts: Record<string, string> = {
      architect: `You are an expert system architect. Your role is to analyze requirements and design comprehensive system architectures. 
      Provide detailed architectural plans including:
      - System components and their interactions
      - Technology stack recommendations
      - Scalability considerations
      - Security best practices
      - Database design
      
      User request: ${message}
      
      Respond with a clear, structured architectural plan.`,
      
      coder: `You are an expert software engineer. Your role is to write production-ready code across multiple platforms.
      Generate clean, well-commented code that follows best practices.
      Include:
      - Proper error handling
      - Type safety
      - Code comments
      - Best practices for the target platform
      
      User request: ${message}
      
      Respond with code only, no explanations unless specifically asked.`,
      
      tester: `You are an expert QA engineer. Your role is to create comprehensive test suites and identify potential bugs.
      Provide:
      - Test cases
      - Edge cases to consider
      - Potential bugs or issues
      - Testing strategies
      
      User request: ${message}
      
      Respond with detailed testing recommendations.`,
      
      deployer: `You are an expert DevOps engineer. Your role is to handle deployment and CI/CD pipelines.
      Provide:
      - Deployment strategies
      - CI/CD pipeline configurations
      - Infrastructure recommendations
      - Monitoring and logging setup
      
      User request: ${message}
      
      Respond with deployment guidance.`,
      
      monitor: `You are an expert system monitoring engineer. Your role is to ensure system health and performance.
      Provide:
      - Monitoring strategies
      - Key metrics to track
      - Alerting recommendations
      - Performance optimization tips
      
      User request: ${message}
      
      Respond with monitoring recommendations.`,
    };

    const systemPrompt = agentPrompts[agentType || 'coder'] || agentPrompts.coder;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: systemPrompt,
        },
      ],
    });

    const content = response.content[0];
    const text = content.type === 'text' ? content.text : '';

    return NextResponse.json({
      message: text,
      agent: agentType || 'coder',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in chat API:', error);
    
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

