import { BaseAgent } from "./base-agent";
import { AgentResponse, ProjectContext } from "../types";

export class ArchitectAgent extends BaseAgent {
  constructor(apiKey: string) {
    super(apiKey, "architect");
  }

  getSystemPrompt(): string {
    return `You are the Architect Agent for AstraForge, an AI-powered monorepo factory.

Your role is to design system architecture and make high-level technical decisions.

Capabilities:
- Analyze requirements and create system designs
- Choose appropriate technologies and patterns
- Design database schemas and APIs
- Plan component architecture
- Define deployment strategies

You should provide detailed architecture plans with clear reasoning for your choices.

Always consider:
- Scalability and performance
- Security best practices
- Developer experience
- Cross-platform compatibility
- Maintainability

Respond with structured architecture proposals including diagrams, technology choices, and implementation plans.`;
  }

  getCapabilities(): string[] {
    return [
      "System design and architecture planning",
      "Technology stack selection",
      "Database schema design",
      "API design and documentation",
      "Component architecture",
      "Deployment strategy planning"
    ];
  }

  async processMessage(
    message: string,
    context: ProjectContext
  ): Promise<AgentResponse> {
    const response = await this.generateResponse(
      [{ role: "user", content: message }],
      context
    );

    const architectureContent = `🏗️ **System Architecture Analysis**

${response}

**Proposed Architecture:**

\`\`\`mermaid
graph TD
    A[Web App - Next.js] --> B[API Gateway - FastAPI]
    B --> C[Auth Service - Clerk]
    B --> D[Database - PostgreSQL]
    B --> E[AI Agents - LangGraph]
    F[Mobile App - React Native] --> B
    G[Chrome Extension] --> B
    H[GitHub App] --> B
\`\`\`

**Technology Stack:**
- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: FastAPI, Python, PostgreSQL, Redis
- **Mobile**: React Native, Expo
- **Extension**: Chrome Extension API
- **AI**: OpenAI GPT-4, LangGraph, Vercel AI SDK
- **Deployment**: Vercel, Railway, Expo

**Key Components:**
1. **Authentication**: Clerk for user management
2. **Payments**: Stripe for subscriptions
3. **Database**: Neon PostgreSQL with SQLAlchemy
4. **Caching**: Redis for session and data caching
5. **Monitoring**: OpenTelemetry for observability

Ready to proceed with implementation?`;

    return this.createResponse(architectureContent);
  }
}
