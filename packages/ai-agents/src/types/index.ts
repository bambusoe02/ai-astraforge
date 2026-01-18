export interface AgentMessage {
  role: "user" | "assistant" | "system";
  content: string;
  agent?: AgentType;
  metadata?: Record<string, any>;
}

export interface AgentResponse {
  content: string;
  agent: AgentType;
  confidence: number;
  metadata?: Record<string, any>;
  actions?: AgentAction[];
}

export interface AgentAction {
  type: "create_file" | "update_file" | "run_command" | "deploy" | "test";
  payload: Record<string, any>;
  description: string;
}

export type AgentType = "architect" | "coder" | "tester" | "deployer" | "monitor";

export interface ProjectContext {
  id: number;
  name: string;
  description?: string;
  platforms: Platform[];
  technologies: string[];
  ownerId: string;
}

export type Platform = "web" | "api" | "mobile" | "extension";

export interface CodeGenerationRequest {
  description: string;
  platform: Platform;
  context: ProjectContext;
  existingCode?: Record<string, string>;
}

export interface BuildStatus {
  platform: Platform;
  status: "pending" | "building" | "success" | "failed";
  logs?: string[];
  duration?: number;
  error?: string;
}
