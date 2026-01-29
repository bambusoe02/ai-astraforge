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

  // Get projects - returns empty array until real backend is connected
  async getProjects() {
    // TODO: Connect to real backend API
    // For now, return empty array to show no fake data
    return [];
  },

  // Get agent activity - returns empty array until real backend is connected
  async getAgentActivity() {
    // TODO: Connect to real backend API
    // For now, return empty array to show no fake data
    return [];
  },
};

