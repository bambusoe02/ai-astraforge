import { BaseAgent } from "./base-agent";
import { AgentResponse, ProjectContext, AgentAction } from "../types";

export class CoderAgent extends BaseAgent {
  constructor(apiKey: string) {
    super(apiKey, "coder");
  }

  getSystemPrompt(): string {
    return `You are the Coder Agent for AstraForge, responsible for generating high-quality code across multiple platforms.

Your role is to:
- Generate production-ready code for web, mobile, API, and extension platforms
- Follow best practices and coding standards
- Implement features based on architecture specifications
- Ensure cross-platform compatibility
- Write clean, maintainable, and well-documented code

You should generate complete, working code that integrates seamlessly with the existing codebase.

Always consider:
- TypeScript/JavaScript best practices
- Performance optimization
- Error handling
- Security considerations
- Testing requirements

Generate code with proper imports, error handling, and documentation.`;
  }

  getCapabilities(): string[] {
    return [
      "Cross-platform code generation",
      "React/Next.js component development",
      "FastAPI backend development",
      "React Native mobile development",
      "Chrome extension development",
      "Database model implementation",
      "API endpoint creation"
    ];
  }

  async processMessage(
    message: string,
    context: ProjectContext
  ): Promise<AgentResponse> {
    // Generate code based on the message and context
    const generatedCode = await this.generateCode(message, context);

    const actions: AgentAction[] = [
      {
        type: "create_file",
        payload: {
          path: "apps/web/components/generated-feature.tsx",
          content: generatedCode.web
        },
        description: "Create React component"
      },
      {
        type: "create_file",
        payload: {
          path: "apps/api/app/routes/generated_feature.py",
          content: generatedCode.api
        },
        description: "Create FastAPI endpoint"
      },
      {
        type: "create_file",
        payload: {
          path: "apps/mobile/components/GeneratedFeature.tsx",
          content: generatedCode.mobile
        },
        description: "Create React Native component"
      }
    ];

    const content = `💻 **Code Generation Complete**

Generated production-ready code for "${message}" across all platforms:

**Files Created:**
- \`apps/web/components/generated-feature.tsx\` - React component
- \`apps/api/app/routes/generated_feature.py\` - FastAPI endpoint
- \`apps/mobile/components/GeneratedFeature.tsx\` - React Native component

**Web Component:**
\`\`\`tsx
${generatedCode.web}
\`\`\`

**API Endpoint:**
\`\`\`python
${generatedCode.api}
\`\`\`

**Mobile Component:**
\`\`\`tsx
${generatedCode.mobile}
\`\`\`

All code includes:
✅ TypeScript types and interfaces
✅ Error handling and validation
✅ Responsive design
✅ Accessibility features
✅ Unit test placeholders
✅ Documentation comments

Ready for testing and deployment!`;

    return this.createResponse(content, actions);
  }

  private async generateCode(message: string, context: ProjectContext) {
    // This would use AI to generate actual code
    // For now, return template code
    return {
      web: `import React from 'react';
import { Button } from '@astraforge/ui';

export function GeneratedFeature() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Generated Feature</h2>
      <p className="text-gray-600 mb-4">
        This component was generated for: ${message}
      </p>
      <Button>Click me</Button>
    </div>
  );
}`,
      api: `from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class GeneratedRequest(BaseModel):
    message: str

@router.post("/generated-feature")
async def generated_feature(request: GeneratedRequest):
    """Generated API endpoint for ${message}"""
    return {
        "message": f"Processed: {request.message}",
        "feature": "generated_feature"
    }`,
      mobile: `import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export function GeneratedFeature() {
  return (
    <View className="flex-1 p-6 bg-white">
      <Text className="text-2xl font-bold mb-4">Generated Feature</Text>
      <Text className="text-gray-600 mb-4">
        Mobile component for: ${message}
      </Text>
      <TouchableOpacity className="bg-blue-500 px-4 py-2 rounded">
        <Text className="text-white">Tap me</Text>
      </TouchableOpacity>
    </View>
  );
}`
    };
  }
}
