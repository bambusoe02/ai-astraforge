"use client";

import { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@astraforge/ui";
// import { Badge } from "@astraforge/ui";
// import { CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react";

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
      <div className="space-y-6">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-slate-700 rounded w-32"></div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-16 bg-slate-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 border border-slate-700 rounded-lg">
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-white text-xl font-semibold">Build Overview</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">{successfulCount}</div>
              <div className="text-sm text-slate-400">Successful</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-500">{buildingCount}</div>
              <div className="text-sm text-slate-400">Building</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">{warningCount}</div>
              <div className="text-sm text-slate-400">Warnings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500">{failedCount}</div>
              <div className="text-sm text-slate-400">Failed</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-lg">
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-white text-xl font-semibold">Project Status</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.name}
                className="flex items-center justify-between p-4 bg-slate-700 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {getStatusIcon(project.status)}
                  <div>
                    <div className="font-medium text-white">{project.name}</div>
                    <div className="text-sm text-slate-400">{project.platform}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-slate-300">{project.tests}%</div>
                    <div className="text-slate-500">Tests</div>
                  </div>
                  <div className="text-center">
                    <div className="text-slate-300">{project.coverage}%</div>
                    <div className="text-slate-500">Coverage</div>
                  </div>
                  <div className="text-slate-400">{project.lastBuild}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-lg">
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-white text-xl font-semibold">Agent Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {activity.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`w-2 h-2 ${getActivityColor(item.status)} rounded-full`}></div>
                <span className="text-slate-300">{item.agent}: {item.message}</span>
                <span className="text-slate-500 text-sm">{item.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
