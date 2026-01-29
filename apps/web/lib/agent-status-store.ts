// Shared agent status store
// In production, this would use Redis or a database

interface AgentStatus {
  name: string;
  status: 'active' | 'idle' | 'busy';
  message: string;
  lastActivity?: string;
}

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

export function getAgentStatuses(): Record<string, AgentStatus> {
  return { ...agentStatuses }; // Return copy to prevent direct mutation
}

export function updateAgentStatus(
  agent: string,
  status: 'active' | 'idle' | 'busy',
  message: string
): void {
  if (agentStatuses[agent]) {
    agentStatuses[agent].status = status;
    agentStatuses[agent].message = message;
    agentStatuses[agent].lastActivity = new Date().toISOString();
  }
}

export function getAgentStatus(agent: string): AgentStatus | undefined {
  return agentStatuses[agent] ? { ...agentStatuses[agent] } : undefined;
}

