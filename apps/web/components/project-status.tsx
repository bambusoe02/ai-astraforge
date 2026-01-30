"use client";

import { useState, useEffect, useMemo } from "react";
import { useApp } from "../lib/context/app-context";

interface Project {
  name: string;
  platform: string;
  status: "success" | "failed" | "building" | "warning";
  lastBuild: string;
  tests: number;
  coverage: number;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "success":
      return "✅";
    case "failed":
      return "❌";
    case "building":
      return "⏳";
    case "warning":
      return "⚠️";
    default:
      return "❓";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "success":
      return "bg-green-600";
    case "failed":
      return "bg-red-600";
    case "building":
      return "bg-yellow-600";
    case "warning":
      return "bg-orange-600";
    default:
      return "bg-gray-600";
  }
};

interface Activity {
  agent: string;
  message: string;
  time: string;
  status: 'success' | 'info' | 'warning' | 'error';
}

export function ProjectStatus() {
  const { projects: contextProjects, messages, currentProjectId } = useApp();
  const [isLoading, setIsLoading] = useState(true);

  // Convert AppContext projects to ProjectStatus format
  const projects: Project[] = useMemo(() => {
    return contextProjects.map((project) => {
      // Determine status based on project activity
      let status: "success" | "failed" | "building" | "warning" = "success";
      if (project.messages.length === 0) {
        status = "warning";
      } else {
        const lastMessage = project.messages[project.messages.length - 1];
        if (lastMessage.content.includes("❌") || lastMessage.content.includes("Error")) {
          status = "failed";
        } else if (lastMessage.content.includes("⏳") || lastMessage.content.includes("Building")) {
          status = "building";
        }
      }

      // Determine platform from codeState
      const platform = project.codeState.platform || "nextjs";
      
      // Calculate test coverage (mock for now, based on messages)
      const tests = project.messages.filter(m => m.agent === "tester").length;
      const coverage = project.messages.length > 0 ? Math.min(95, 50 + tests * 5) : 0;

      return {
        name: project.name,
        platform: platform === "nextjs" ? "Next.js" : platform === "fastapi" ? "FastAPI" : "React Native",
        status,
        lastBuild: project.updatedAt.toLocaleDateString(),
        tests,
        coverage,
      };
    });
  }, [contextProjects]);

  // Convert messages to activity feed
  const activity: Activity[] = useMemo(() => {
    if (!currentProjectId) return [];
    
    const currentProject = contextProjects.find(p => p.id === currentProjectId);
    if (!currentProject) return [];

    // Get recent messages (last 10) and convert to activity
    return currentProject.messages
      .slice(-10)
      .reverse()
      .map((msg) => {
        let status: 'success' | 'info' | 'warning' | 'error' = 'info';
        if (msg.content.includes("❌") || msg.content.includes("Error")) {
          status = 'error';
        } else if (msg.content.includes("⚠️") || msg.content.includes("Warning")) {
          status = 'warning';
        } else if (msg.content.includes("✅") || msg.content.includes("Success")) {
          status = 'success';
        }

        // Extract short message preview
        const messagePreview = msg.content
          .replace(/```[\s\S]*?```/g, '[code]') // Remove code blocks
          .replace(/\*\*/g, '') // Remove markdown bold
          .substring(0, 60)
          .trim() + (msg.content.length > 60 ? '...' : '');

        return {
          agent: msg.agent ? msg.agent.charAt(0).toUpperCase() + msg.agent.slice(1) : 'System',
          message: messagePreview,
          time: msg.timestamp.toLocaleTimeString(),
          status,
        };
      });
  }, [contextProjects, currentProjectId, messages]);

  useEffect(() => {
    // Simulate loading delay for smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const getActivityColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-500';
      case 'info': return 'bg-blue-500';
      case 'warning': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const successfulCount = projects.filter(p => p.status === 'success').length;
  const buildingCount = projects.filter(p => p.status === 'building').length;
  const warningCount = projects.filter(p => p.status === 'warning').length;
  const failedCount = projects.filter(p => p.status === 'failed').length;

  if (isLoading) {
    return (
      <div className="space-y-4 sm:space-y-6 p-4 sm:p-6 overflow-y-auto h-full">
        <div className="bg-gray-900/80 border border-gray-800 rounded-lg p-4 sm:p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-800 rounded w-32"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-16 bg-gray-800 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6 overflow-y-auto h-full">
      {/* Build Overview - Responsive grid */}
      <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-lg">
        <div className="p-4 sm:p-6 border-b border-gray-800">
          <h2 className="text-gray-100 text-lg sm:text-xl font-semibold">Build Overview</h2>
        </div>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div className="text-center p-3 sm:p-4 bg-gray-800/80 rounded-lg">
              <div className="text-xl sm:text-2xl font-bold text-green-500">{successfulCount}</div>
              <div className="text-xs sm:text-sm text-gray-400">Successful</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-gray-800/80 rounded-lg">
              <div className="text-xl sm:text-2xl font-bold text-yellow-500">{buildingCount}</div>
              <div className="text-xs sm:text-sm text-gray-400">Building</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-gray-800/80 rounded-lg">
              <div className="text-xl sm:text-2xl font-bold text-orange-500">{warningCount}</div>
              <div className="text-xs sm:text-sm text-gray-400">Warnings</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-gray-800/80 rounded-lg">
              <div className="text-xl sm:text-2xl font-bold text-red-500">{failedCount}</div>
              <div className="text-xs sm:text-sm text-gray-400">Failed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Status - Responsive: 1 col mobile, 2 tablet, 3 desktop */}
      <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-lg">
        <div className="p-4 sm:p-6 border-b border-gray-800">
          <h2 className="text-gray-100 text-lg sm:text-xl font-semibold">Project Status</h2>
        </div>
        <div className="p-4 sm:p-6">
          {projects.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 text-sm">No projects yet. Create a project to see status here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {projects.map((project) => (
                <div
                  key={project.name}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-800/80 rounded-lg gap-3 sm:gap-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{getStatusIcon(project.status)}</span>
                    <div>
                      <div className="font-medium text-gray-100 text-sm sm:text-base">{project.name}</div>
                      <div className="text-xs sm:text-sm text-gray-400">{project.platform}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                    <div className="text-center">
                      <div className="text-gray-300">{project.tests}</div>
                      <div className="text-gray-500">Tests</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-300">{project.coverage}%</div>
                      <div className="text-gray-500">Coverage</div>
                    </div>
                    <div className="text-gray-400 hidden sm:block">{project.lastBuild}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Agent Activity */}
      <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-lg">
        <div className="p-4 sm:p-6 border-b border-gray-800">
          <h2 className="text-gray-100 text-lg sm:text-xl font-semibold">Agent Activity</h2>
          {currentProjectId && (
            <p className="text-xs text-gray-400 mt-1">
              Showing activity for current project
            </p>
          )}
        </div>
        <div className="p-4 sm:p-6">
          {activity.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 text-sm">
                {currentProjectId ? "No activity yet. Start chatting with agents to see activity here." : "Select a project to see agent activity."}
              </p>
            </div>
          ) : (
            <div className="space-y-2 sm:space-y-3">
              {activity.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 ${getActivityColor(item.status)} rounded-full flex-shrink-0`}></div>
                    <span className="text-gray-300 font-medium">{item.agent}:</span>
                  </div>
                  <span className="text-gray-300 flex-1">{item.message}</span>
                  <span className="text-gray-500">{item.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
