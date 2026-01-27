"use client";

import { useState, useEffect } from "react";
// import { Badge } from "@astraforge/ui";
// import { Brain, Code, TestTube, Rocket, Monitor } from "lucide-react";

interface Agent {
  name: string;
  status: "active" | "idle" | "busy";
  icon: string;
  description: string;
}

const agentIcons: Record<string, string> = {
  architect: "🏗️",
  coder: "💻",
  tester: "🧪",
  deployer: "🚀",
  monitor: "📊",
  security: "🔒",
};

const agentDescriptions: Record<string, string> = {
  architect: "Designs system architecture",
  coder: "Generates cross-platform code",
  tester: "Runs automated tests",
  deployer: "Handles deployments",
  monitor: "System health monitoring",
  security: "Security analysis & auditing",
};

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
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAgentStatus = async () => {
      try {
        const { mockApi } = await import("../lib/mock-data");
        const statusData = await mockApi.getAgentStatus();
        
        const agentsList: Agent[] = Object.entries(statusData).map(([key, status]) => ({
          name: key.charAt(0).toUpperCase() + key.slice(1),
          status: status.status,
          icon: agentIcons[key] || "🤖",
          description: status.message,
        }));
        
        setAgents(agentsList);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading agent status:", error);
        setIsLoading(false);
      }
    };

    loadAgentStatus();
  }, []);

  if (isLoading) {
    return (
      <div className="mt-auto">
        <h3 className="text-sm font-semibold text-slate-300 mb-3">AI Agents</h3>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-slate-700 animate-pulse">
              <div className="w-6 h-6 bg-slate-600 rounded"></div>
              <div className="flex-1">
                <div className="h-4 bg-slate-600 rounded w-20 mb-1"></div>
                <div className="h-3 bg-slate-600 rounded w-32"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

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
