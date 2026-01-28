"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface Agent {
  name: string;
  status: "active" | "idle" | "busy";
  icon: string;
  description: string;
  progress?: number;
}

interface Activity {
  agent: string;
  action: string;
  timestamp: Date;
  status: "success" | "info" | "error";
}

const agentIcons: Record<string, string> = {
  architect: "🏗️",
  coder: "💻",
  tester: "🧪",
  deployer: "🚀",
  monitor: "📊",
  security: "🔒",
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-500";
    case "busy":
      return "bg-yellow-500";
    case "idle":
      return "bg-gray-500";
    default:
      return "bg-gray-500";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "active":
      return <CheckCircle2 className="w-3 h-3" />;
    case "busy":
      return <Loader2 className="w-3 h-3 animate-spin" />;
    case "idle":
      return <AlertCircle className="w-3 h-3" />;
    default:
      return null;
  }
};

export function AgentStatus() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
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
          progress: status.status === "busy" ? Math.floor(Math.random() * 100) : undefined,
        }));
        
        setAgents(agentsList);
        
        // Mock recent activities
        const mockActivities: Activity[] = [
          { agent: "Architect", action: "System design completed", timestamp: new Date(Date.now() - 120000), status: "success" },
          { agent: "Coder", action: "Generating API endpoints", timestamp: new Date(Date.now() - 60000), status: "info" },
          { agent: "Tester", action: "Running integration tests", timestamp: new Date(Date.now() - 30000), status: "info" },
          { agent: "Deployer", action: "Deploying to staging", timestamp: new Date(Date.now() - 10000), status: "info" },
          { agent: "Monitor", action: "System health check", timestamp: new Date(Date.now() - 5000), status: "success" },
        ];
        setActivities(mockActivities.slice(0, 5));
        
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
      <div>
        <h3 className="text-sm font-semibold text-slate-300 mb-3">AI Agents</h3>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/5 animate-pulse">
              <div className="w-8 h-8 bg-white/10 rounded-lg"></div>
              <div className="flex-1">
                <div className="h-3 bg-white/10 rounded w-20 mb-1"></div>
                <div className="h-2 bg-white/10 rounded w-32"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-300 mb-3">AI Agents</h3>
      <div className="space-y-2 mb-4">
        {agents.map((agent) => (
          <motion.div
            key={agent.name}
            className="relative p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-2">
              <div className={`text-2xl ${agent.status === "active" ? "animate-pulse" : ""}`}>
                {agent.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium text-white truncate">
                    {agent.name}
                  </div>
                  <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded ${getStatusColor(agent.status)}/20`}>
                    {getStatusIcon(agent.status)}
                  </div>
                </div>
                <div className="text-xs text-slate-400 truncate mt-0.5">
                  {agent.description}
                </div>
                {agent.progress !== undefined && (
                  <div className="mt-2">
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${getStatusColor(agent.status)}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${agent.progress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <div className="text-xs text-slate-400 mt-1">{agent.progress}%</div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      {activities.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <h4 className="text-xs font-semibold text-slate-400 mb-2">Recent Activity</h4>
          <div className="space-y-1.5 max-h-32 overflow-y-auto">
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-2 text-xs"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${
                  activity.status === "success" ? "bg-green-500" :
                  activity.status === "error" ? "bg-red-500" :
                  "bg-blue-500"
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="text-slate-300 truncate">
                    <span className="font-medium">{activity.agent}</span>: {activity.action}
                  </div>
                  <div className="text-slate-500 text-[10px]">
                    {Math.floor((Date.now() - activity.timestamp.getTime()) / 1000)}s ago
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
