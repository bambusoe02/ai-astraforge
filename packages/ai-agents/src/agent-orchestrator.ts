import { AgentType, AgentMessage, AgentResponse, ProjectContext } from "./types";
import { ArchitectAgent } from "./agents/architect-agent";
import { CoderAgent } from "./agents/coder-agent";
import { TesterAgent } from "./agents/tester-agent";
import { DeployerAgent } from "./agents/deployer-agent";
import { MonitorAgent } from "./agents/monitor-agent";

export class AgentOrchestrator {
  private agents: Map<AgentType, any>;
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.agents = new Map();
    this.initializeAgents();
  }

  private initializeAgents() {
    this.agents.set("architect", new ArchitectAgent(this.apiKey));
    this.agents.set("coder", new CoderAgent(this.apiKey));
    this.agents.set("tester", new TesterAgent(this.apiKey));
    this.agents.set("deployer", new DeployerAgent(this.apiKey));
    this.agents.set("monitor", new MonitorAgent(this.apiKey));
  }

  async processWithAgent(
    agentType: AgentType,
    message: string,
    context: ProjectContext
  ): Promise<AgentResponse> {
    const agent = this.agents.get(agentType);
    if (!agent) {
      throw new Error(`Agent type '${agentType}' not found`);
    }

    return await agent.processMessage(message, context);
  }

  async processWorkflow(
    initialMessage: string,
    context: ProjectContext
  ): Promise<AgentResponse[]> {
    const responses: AgentResponse[] = [];

    // 1. Architect designs the system
    console.log("🤖 Running Architect Agent...");
    const architectResponse = await this.processWithAgent(
      "architect",
      initialMessage,
      context
    );
    responses.push(architectResponse);

    // 2. Coder generates the code
    console.log("💻 Running Coder Agent...");
    const coderResponse = await this.processWithAgent(
      "coder",
      `Implement the following architecture: ${architectResponse.content}`,
      context
    );
    responses.push(coderResponse);

    // 3. Tester runs QA
    console.log("🧪 Running Tester Agent...");
    const testerResponse = await this.processWithAgent(
      "tester",
      "Run comprehensive tests on the generated code",
      context
    );
    responses.push(testerResponse);

    // 4. Deployer handles deployment
    console.log("🚀 Running Deployer Agent...");
    const deployerResponse = await this.processWithAgent(
      "deployer",
      "Deploy the tested code to production",
      context
    );
    responses.push(deployerResponse);

    // 5. Monitor provides health check
    console.log("📊 Running Monitor Agent...");
    const monitorResponse = await this.processWithAgent(
      "monitor",
      "Provide system health report",
      context
    );
    responses.push(monitorResponse);

    return responses;
  }

  getAgentCapabilities(agentType: AgentType): string[] {
    const agent = this.agents.get(agentType);
    return agent ? agent.getCapabilities() : [];
  }

  getAllAgentStatuses() {
    const statuses: Record<string, any> = {};
    for (const [type, agent] of this.agents) {
      statuses[type] = {
        status: "active",
        capabilities: agent.getCapabilities(),
        lastActivity: new Date().toISOString()
      };
    }
    return statuses;
  }
}
