"use client";

import { useState, useEffect } from "react";

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

export function ProjectStatus() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activity, setActivity] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { mockApi } = await import("../lib/mock-data");
        const [projectsData, activityData] = await Promise.all([
          mockApi.getProjects(),
          mockApi.getAgentActivity(),
        ]);
        
        setProjects(projectsData);
        setActivity(activityData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading project status:", error);
        setIsLoading(false);
      }
    };

    loadData();
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
                    <div className="text-gray-300">{project.tests}%</div>
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
        </div>
      </div>

      {/* Agent Activity */}
      <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-lg">
        <div className="p-4 sm:p-6 border-b border-gray-800">
          <h2 className="text-gray-100 text-lg sm:text-xl font-semibold">Agent Activity</h2>
        </div>
        <div className="p-4 sm:p-6">
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
        </div>
      </div>
    </div>
  );
}
