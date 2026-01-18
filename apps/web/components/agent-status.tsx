"use client";

import { Badge } from "@astraforge/ui";
import { Brain, Code, TestTube, Rocket, Monitor } from "lucide-react";

interface Agent {
  name: string;
  status: "active" | "idle" | "busy";
  icon: React.ReactNode;
  description: string;
}

const agents: Agent[] = [
  {
    name: "Architect",
    status: "active",
    icon: <Brain className="w-4 h-4" />,
    description: "Designs system architecture",
  },
  {
    name: "Coder",
    status: "busy",
    icon: <Code className="w-4 h-4" />,
    description: "Generates cross-platform code",
  },
  {
    name: "Tester",
    status: "idle",
    icon: <TestTube className="w-4 h-4" />,
    description: "Runs automated tests",
  },
  {
    name: "Deployer",
    status: "idle",
    icon: <Rocket className="w-4 h-4" />,
    description: "Handles deployments",
  },
  {
    name: "Monitor",
    status: "active",
    icon: <Monitor className="w-4 h-4" />,
    description: "System health monitoring",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-600";
    case "busy":
      return "bg-yellow-600";
    case "idle":
      return "bg-gray-600";
    default:
      return "bg-gray-600";
  }
};

export function AgentStatus() {
  return (
    <div className="mt-auto">
      <h3 className="text-sm font-semibold text-slate-300 mb-3">AI Agents</h3>
      <div className="space-y-2">
        {agents.map((agent) => (
          <div
            key={agent.name}
            className="flex items-center gap-2 p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
          >
            <div className="text-purple-400">{agent.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">
                {agent.name}
              </div>
              <div className="text-xs text-slate-400 truncate">
                {agent.description}
              </div>
            </div>
            <Badge
              variant="secondary"
              className={`text-xs ${getStatusColor(agent.status)} text-white`}
            >
              {agent.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
