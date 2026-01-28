"use client";

import { useState } from "react";
import { AgentChat } from "./agent-chat";
import { CodeEditor } from "./code-editor";
import { ProjectStatus } from "./project-status";
import { Sidebar } from "./dashboard/sidebar";
import { TopBanner } from "./dashboard/top-banner";

export function Dashboard() {
  const [activeView, setActiveView] = useState<"chat" | "editor" | "status">("chat");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
      {/* Top Banner */}
      <TopBanner />

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="relative flex flex-col lg:flex-row h-screen pt-12 sm:pt-14">
        {/* Sidebar */}
        <Sidebar activeView={activeView} onViewChange={setActiveView} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden p-4 sm:p-6 lg:p-6 min-h-0">
          <div className="h-full backdrop-blur-xl bg-white/5 rounded-xl lg:rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
            {activeView === "chat" && <AgentChat />}
            {activeView === "editor" && <CodeEditor />}
            {activeView === "status" && <ProjectStatus />}
          </div>
        </main>
      </div>
    </div>
  );
}
