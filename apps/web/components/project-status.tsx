"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@astraforge/ui";
import { Badge } from "@astraforge/ui";
import { CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react";

interface Project {
  name: string;
  platform: string;
  status: "success" | "failed" | "building" | "warning";
  lastBuild: string;
  tests: number;
  coverage: number;
}

const projects: Project[] = [
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

const getStatusIcon = (status: string) => {
  switch (status) {
    case "success":
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case "failed":
      return <XCircle className="w-4 h-4 text-red-500" />;
    case "building":
      return <Clock className="w-4 h-4 text-yellow-500" />;
    case "warning":
      return <AlertTriangle className="w-4 h-4 text-orange-500" />;
    default:
      return null;
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
  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Build Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">3</div>
              <div className="text-sm text-slate-400">Successful</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-500">1</div>
              <div className="text-sm text-slate-400">Building</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">0</div>
              <div className="text-sm text-slate-400">Warnings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500">0</div>
              <div className="text-sm text-slate-400">Failed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Project Status</CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Agent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-slate-300">Architect: System design completed</span>
              <span className="text-slate-500 text-sm">2m ago</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-slate-300">Coder: Generating API endpoints</span>
              <span className="text-slate-500 text-sm">1m ago</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-slate-300">Tester: Running integration tests</span>
              <span className="text-slate-500 text-sm">30s ago</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-slate-300">Deployer: Deploying to staging</span>
              <span className="text-slate-500 text-sm">now</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
