import { OpenAI } from "@langchain/openai";
import { AgentMessage, AgentResponse, AgentAction, ProjectContext } from "../types";

export abstract class BaseAgent {
  protected llm: OpenAI;
  protected agentType: string;

  constructor(apiKey: string, agentType: string) {
    this.llm = new OpenAI({
      openAIApiKey: apiKey,
      modelName: "gpt-4-turbo-preview",
      temperature: 0.1,
    });
    this.agentType = agentType;
  }

  abstract getSystemPrompt(): string;
  abstract getCapabilities(): string[];
  abstract processMessage(
    message: string,
    context: ProjectContext
  ): Promise<AgentResponse>;

  protected async generateResponse(
    messages: AgentMessage[],
    context: ProjectContext
  ): Promise<string> {
    const prompt = `${this.getSystemPrompt()}\n\nContext:\n${JSON.stringify(context, null, 2)}`;

    const fullMessages = [
      { role: "system", content: prompt },
      ...messages.map(m => ({ role: m.role, content: m.content }))
    ];

    const response = await this.llm.call(fullMessages as any);
    return response.content;
  }

  protected parseActions(content: string): AgentAction[] {
    // Parse actions from response content
    // This would use regex or JSON parsing to extract structured actions
    const actions: AgentAction[] = [];

    // Example parsing logic
    if (content.includes("CREATE_FILE")) {
      actions.push({
        type: "create_file",
        payload: { path: "example.ts", content: "// Generated code" },
        description: "Create a new file"
      });
    }

    return actions;
  }

  protected createResponse(
    content: string,
    actions: AgentAction[] = []
  ): AgentResponse {
    return {
      content,
      agent: this.agentType as any,
      confidence: 0.9,
      actions,
    };
  }
}
