// lib/mock-data.ts
export const mockAgentStatus = {
  architect: { status: 'active', message: 'Analyzing requirements...' },
  coder: { status: 'busy', message: 'Generating code...' },
  tester: { status: 'idle', message: 'Waiting for code...' },
  deployer: { status: 'idle', message: 'Ready to deploy' },
  monitor: { status: 'active', message: 'System healthy' },
  security: { status: 'idle', message: 'Scanning...' }
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

export const mockProjects = [
  {
    name: "Web Dashboard",
    platform: "Next.js",
    status: "success",
    lastBuild: "2 minutes ago",
    tests: 95,
    coverage: 87,
  },
  {
    name: "API Backend",
    platform: "FastAPI",
    status: "building",
    lastBuild: "Building...",
    tests: 92,
    coverage: 91,
  },
  {
    name: "Mobile App",
    platform: "React Native",
    status: "warning",
    lastBuild: "5 minutes ago",
    tests: 88,
    coverage: 82,
  },
  {
    name: "Chrome Extension",
    platform: "Chrome",
    status: "success",
    lastBuild: "1 minute ago",
    tests: 96,
    coverage: 89,
  },
];

export const mockAgentActivity = [
  { agent: "Architect", message: "System design completed", time: "2m ago", status: "success" },
  { agent: "Coder", message: "Generating API endpoints", time: "1m ago", status: "info" },
  { agent: "Tester", message: "Running integration tests", time: "30s ago", status: "info" },
  { agent: "Deployer", message: "Deploying to staging", time: "now", status: "info" },
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
  sendMessage: async (message: string, agentType: string) => {
    await simulateApiDelay(2000);
    return {
      content: `Mock response from ${agentType} for: "${message}"`,
      agent: agentType,
      confidence: 0.9,
      actions: [],
    };
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
