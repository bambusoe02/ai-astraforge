// Production API client for AstraForge
// Replaces mock-data.ts with real API calls

export interface ChatMessage {
  message: string;
  agent: string;
  timestamp: string;
}

export interface CodeGenerationResponse {
  code: string;
  language: string;
}

export interface AgentStatus {
  name: string;
  status: 'active' | 'idle' | 'busy';
  message: string;
  lastActivity?: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export const api = {
  // Send a chat message to Claude
  async sendMessage(message: string, agentType?: string): Promise<ChatMessage[]> {
    try {
      const response = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, agentType }),
      });

      const data = await handleResponse<ChatMessage>(response);
      return [data];
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  // Generate code for a specific platform
  async generateCode(platform: string, prompt?: string): Promise<CodeGenerationResponse> {
    try {
      const response = await fetch(`${API_BASE}/generate-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ platform, prompt }),
      });

      return handleResponse<CodeGenerationResponse>(response);
    } catch (error) {
      console.error('Error generating code:', error);
      throw error;
    }
  },

  // Get agent status
  async getAgentStatus(): Promise<Record<string, AgentStatus>> {
    try {
      const response = await fetch(`${API_BASE}/agent-status`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return handleResponse<Record<string, AgentStatus>>(response);
    } catch (error) {
      console.error('Error fetching agent status:', error);
      throw error;
    }
  },

  // Get projects (placeholder - would connect to real backend)
  async getProjects() {
    // This would connect to your real backend API
    // For now, return mock data structure
    return [
      {
        name: 'Web Dashboard',
        platform: 'Next.js',
        status: 'success' as const,
        lastBuild: '2 minutes ago',
        tests: 95,
        coverage: 87,
      },
      {
        name: 'API Backend',
        platform: 'FastAPI',
        status: 'building' as const,
        lastBuild: 'Building...',
        tests: 92,
        coverage: 91,
      },
      {
        name: 'Mobile App',
        platform: 'React Native',
        status: 'warning' as const,
        lastBuild: '5 minutes ago',
        tests: 88,
        coverage: 82,
      },
      {
        name: 'Chrome Extension',
        platform: 'Chrome',
        status: 'success' as const,
        lastBuild: '1 minute ago',
        tests: 96,
        coverage: 89,
      },
    ];
  },

  // Get agent activity (placeholder - would connect to real backend)
  async getAgentActivity() {
    // This would connect to your real backend API
    // For now, return mock data structure
    return [
      { agent: 'Architect', message: 'Planned entire system architecture', time: '2m ago', status: 'success' },
      { agent: 'Coder', message: 'Generated production-ready code across platforms', time: '1m ago', status: 'info' },
      { agent: 'Tester', message: 'Caught 3 bugs before production', time: '30s ago', status: 'info' },
      { agent: 'Deployer', message: 'Deploying with enterprise-grade CI/CD', time: 'now', status: 'info' },
    ];
  },
};

