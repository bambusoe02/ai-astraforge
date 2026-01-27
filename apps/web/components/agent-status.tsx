"use client";

// import { Badge } from "@astraforge/ui";
// import { Brain, Code, TestTube, Rocket, Monitor } from "lucide-react";

interface Agent {
  name: string;
  status: "active" | "idle" | "busy";
  icon: string;
  description: string;
}

const agents: Agent[] = [
  {
    name: "Architect",
    status: "active",
    icon: "🏗️",
    description: "Designs system architecture",
  },
  {
    name: "Coder",
    status: "busy",
    icon: "💻",
    description: "Generates cross-platform code",
  },
  {
    name: "Tester",
    status: "idle",
    icon: "🧪",
    description: "Runs automated tests",
  },
  {
    name: "Deployer",
    status: "idle",
    icon: "🚀",
    description: "Handles deployments",
  },
  {
    name: "Monitor",
    status: "active",
    icon: "📊",
    description: "System health monitoring",
  },
  {
    name: "Security",
    status: "idle",
    icon: "🔒",
    description: "Security analysis & auditing",
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
            <span
              className={`text-xs px-2 py-1 rounded ${getStatusColor(agent.status)} text-white`}
            >
              {agent.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
