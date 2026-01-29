import { NextRequest, NextResponse } from 'next/server';

// Simple agent status tracking
// In production, this would connect to a real agent orchestration system
interface AgentStatus {
  name: string;
  status: 'active' | 'idle' | 'busy';
  message: string;
  lastActivity?: string;
}

// In-memory status store (use Redis/database in production)
const agentStatuses: Record<string, AgentStatus> = {
  architect: {
    name: 'Architect',
    status: 'idle',
    message: 'Ready to plan system architecture',
  },
  coder: {
    name: 'Coder',
    status: 'idle',
    message: 'Ready to generate production-ready code',
  },
  tester: {
    name: 'Tester',
    status: 'idle',
    message: 'Ready to catch bugs before production',
  },
  deployer: {
    name: 'Deployer',
    status: 'idle',
    message: 'Ready to ship with enterprise-grade CI/CD',
  },
  monitor: {
    name: 'Monitor',
    status: 'active',
    message: 'Keeping systems healthy 24/7',
  },
  security: {
    name: 'Security',
    status: 'idle',
    message: 'Scanning for vulnerabilities...',
  },
};

export async function GET(request: NextRequest) {
  try {
    // In production, this would fetch real agent status from your orchestration system
    // For now, return the current status
    return NextResponse.json(agentStatuses);
  } catch (error) {
    console.error('Error in agent-status API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Update agent status (called when agents are working)
export async function POST(request: NextRequest) {
  try {
    const { agent, status, message } = await request.json();

    if (agent && agentStatuses[agent]) {
      agentStatuses[agent].status = status || agentStatuses[agent].status;
      agentStatuses[agent].message = message || agentStatuses[agent].message;
      agentStatuses[agent].lastActivity = new Date().toISOString();
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating agent status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

