import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check critical environment variables
    const hasAnthropicKey = !!process.env.ANTHROPIC_API_KEY;
    
    // Basic health check
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      services: {
        anthropic: hasAnthropicKey ? 'configured' : 'not_configured',
        database: 'not_configured', // TODO: Add database health check when connected
        redis: 'not_configured', // TODO: Add Redis health check when connected
      },
      uptime: process.uptime(),
    };

    return NextResponse.json(health, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

