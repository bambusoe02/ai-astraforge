// Production API client for AstraForge
// Replaces mock-data.ts with real API calls

export interface ChatMessage {
  message?: string;
  error?: string;
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
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorData.message || errorMessage;
    } catch {
      // If response is not JSON, use status text
      errorMessage = response.statusText || errorMessage;
    }
    
    // Provide helpful error messages
    if (response.status === 500 && errorMessage.includes('API key')) {
      errorMessage = 'API key not configured. Please set ANTHROPIC_API_KEY in your environment variables.';
    } else if (response.status === 429) {
      errorMessage = 'Rate limit exceeded. Please wait a moment and try again.';
    } else if (response.status === 401 || response.status === 403) {
      errorMessage = 'Authentication failed. Please check your API key.';
    }
    
    throw new Error(errorMessage);
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
      // Log errors in development, use proper logging service in production
      if (process.env.NODE_ENV === 'development') {
        console.error('Error sending message:', error);
      }
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
      // Log errors in development, use proper logging service in production
      if (process.env.NODE_ENV === 'development') {
        console.error('Error generating code:', error);
      }
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
      // Log errors in development, use proper logging service in production
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching agent status:', error);
      }
      throw error;
    }
  },

  // Get projects
  // NOTE: Currently returns empty array as projects are managed via localStorage in AppContext.
  // Future: Connect to backend API when database integration is implemented.
  // See: apps/web/lib/context/app-context.tsx for current project management.
  async getProjects() {
    return [];
  },

  // Get agent activity
  // NOTE: Currently returns empty array. Activity tracking will be implemented when
  // backend API is connected. Agent status is available via getAgentStatus().
  async getAgentActivity() {
    return [];
  },
};

