// lib/mock-data.ts
export const mockAgentStatus: Record<string, { status: 'active' | 'busy' | 'idle'; message: string }> = {
  architect: { status: 'active' as const, message: 'Planning system architecture like a senior engineer' },
  coder: { status: 'busy' as const, message: 'Writing production-ready code across all platforms' },
  tester: { status: 'idle' as const, message: 'Ready to catch bugs before production' },
  deployer: { status: 'idle' as const, message: 'Ready to ship with enterprise-grade CI/CD' },
  monitor: { status: 'active' as const, message: 'Keeping systems healthy 24/7' },
  security: { status: 'idle' as const, message: 'Scanning for vulnerabilities...' }
};

export const mockGeneratedCode = {
  nextjs: `// Task Component
import { Task } from '@/types'

export function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <div className="space-y-2">
      {tasks.map(task => (
        <div key={task.id} className="p-4 border rounded">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  )
}`,
  fastapi: `# Task API Endpoint
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class Task(BaseModel):
    id: int
    title: str
    description: str

@router.get("/tasks")
async def get_tasks():
    return [
        {"id": 1, "title": "Task 1", "description": "Description"}
    ]`,
  mobile: `// React Native Task Screen
import { View, Text, FlatList } from 'react-native'

export function TaskScreen() {
  const tasks = [
    { id: 1, title: 'Task 1', description: 'Description' }
  ]

  return (
    <FlatList
      data={tasks}
      renderItem={({ item }) => (
        <View>
          <Text>{item.title}</Text>
          <Text>{item.description}</Text>
        </View>
      )}
    />
  )
}`
};

export const mockProjects: Array<{
  name: string;
  platform: string;
  status: "success" | "building" | "warning" | "failed";
  lastBuild: string;
  tests: number;
  coverage: number;
}> = [
  {
    name: "Web Dashboard",
    platform: "Next.js",
    status: "success" as const,
    lastBuild: "2 minutes ago",
    tests: 95,
    coverage: 87,
  },
  {
    name: "API Backend",
    platform: "FastAPI",
    status: "building" as const,
    lastBuild: "Building...",
    tests: 92,
    coverage: 91,
  },
  {
    name: "Mobile App",
    platform: "React Native",
    status: "warning" as const,
    lastBuild: "5 minutes ago",
    tests: 88,
    coverage: 82,
  },
  {
    name: "Chrome Extension",
    platform: "Chrome",
    status: "success" as const,
    lastBuild: "1 minute ago",
    tests: 96,
    coverage: 89,
  },
];

export const mockAgentActivity: Array<{
  agent: string;
  message: string;
  time: string;
  status: string;
}> = [
  { agent: "Architect", message: "Planned entire system architecture", time: "2m ago", status: "success" },
  { agent: "Coder", message: "Generated production-ready code across platforms", time: "1m ago", status: "info" },
  { agent: "Tester", message: "Caught 3 bugs before production", time: "30s ago", status: "info" },
  { agent: "Deployer", message: "Deploying with enterprise-grade CI/CD", time: "now", status: "info" },
];

export const simulateApiDelay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const mockApi = {
  getAgentStatus: async () => {
    await simulateApiDelay(2000);
    return mockAgentStatus;
  },
  getProjects: async () => {
    await simulateApiDelay(2000);
    return mockProjects;
  },
  getAgentActivity: async () => {
    await simulateApiDelay(2000);
    return mockAgentActivity;
  },
  sendMessage: async (message: string, agentType?: string) => {
    await simulateApiDelay(2000);
    const agents = ["architect", "coder", "tester", "deployer", "monitor"];
    const selectedAgent = agentType || agents[Math.floor(Math.random() * agents.length)];
    
    return [
      {
        message: `Mock response from ${selectedAgent} for: "${message}"`,
        agent: selectedAgent,
        timestamp: new Date(),
      },
    ];
  },
  generateCode: async (platform: string) => {
    await simulateApiDelay(2000);
    switch (platform) {
      case "nextjs":
        return { code: mockGeneratedCode.nextjs, language: "typescript" };
      case "fastapi":
        return { code: mockGeneratedCode.fastapi, language: "python" };
      case "mobile":
        return { code: mockGeneratedCode.mobile, language: "typescript" };
      default:
        return { code: "// Select a platform to generate code", language: "plaintext" };
    }
  },
};
