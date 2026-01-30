import { NextRequest, NextResponse } from 'next/server';
import { getAgentStatuses, updateAgentStatus } from '@/lib/agent-status-store';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    // Get current agent statuses from shared store
    const statuses = getAgentStatuses();
    return NextResponse.json(statuses);
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

    if (agent && status) {
      updateAgentStatus(agent, status, message || '');
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

