"use client";

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@astraforge/ui";
import { AgentChat } from "./agent-chat";
import { CodeEditor } from "./code-editor";
import { ProjectStatus } from "./project-status";
import { AgentStatus } from "./agent-status";

export function Dashboard() {
  const [activeView, setActiveView] = useState<"chat" | "editor" | "status">("chat");

  return (
    <div className="flex h-screen bg-slate-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 p-6 flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-bold">AstraForge</h1>
          <UserButton afterSignOutUrl="/" />
        </div>

        <nav className="space-y-2 flex-1">
          <button
            onClick={() => setActiveView("chat")}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              activeView === "chat"
                ? "bg-purple-600 text-white"
                : "text-slate-300 hover:bg-slate-700"
            }`}
          >
            🤖 AI Agents
          </button>
          <button
            onClick={() => setActiveView("editor")}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              activeView === "editor"
                ? "bg-purple-600 text-white"
                : "text-slate-300 hover:bg-slate-700"
            }`}
          >
            📝 Code Editor
          </button>
          <button
            onClick={() => setActiveView("status")}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              activeView === "status"
                ? "bg-purple-600 text-white"
                : "text-slate-300 hover:bg-slate-700"
            }`}
          >
            📊 Status
          </button>
        </nav>

        <AgentStatus />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {activeView === "chat" && <AgentChat />}
        {activeView === "editor" && <CodeEditor />}
        {activeView === "status" && <ProjectStatus />}
      </div>
    </div>
  );
}
