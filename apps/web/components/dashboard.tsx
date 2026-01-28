"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { AgentChat } from "./agent-chat";
import { ProjectStatus } from "./project-status";
import { Sidebar } from "./dashboard/sidebar";
import { TopBanner } from "./dashboard/top-banner";
import { SkeletonLoader } from "./skeleton-loader";

// Dynamic import for heavy CodeEditor component (Monaco Editor)
const CodeEditor = dynamic(() => import("./code-editor").then(mod => ({ default: mod.CodeEditor })), {
  loading: () => (
    <div className="h-full flex items-center justify-center p-6">
      <div className="w-full space-y-4">
        <SkeletonLoader className="h-12" />
        <SkeletonLoader className="h-96" />
      </div>
    </div>
  ),
  ssr: false, // Monaco Editor doesn't work with SSR
});

export function Dashboard() {
  const [activeView, setActiveView] = useState<"chat" | "editor" | "status">("chat");

  return (
    <div className="min-h-screen relative">
      {/* Top Banner */}
      <TopBanner />

      {/* Animated Background - Reduced opacity for better readability */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="relative flex flex-col lg:flex-row h-screen pt-12 sm:pt-14 z-10">
        {/* Sidebar */}
        <Sidebar activeView={activeView} onViewChange={setActiveView} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden p-4 sm:p-6 lg:p-6 min-h-0">
          <div className="h-full backdrop-blur-xl bg-gray-900/80 rounded-xl lg:rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
            {activeView === "chat" && <AgentChat />}
            {activeView === "editor" && <CodeEditor />}
            {activeView === "status" && <ProjectStatus />}
          </div>
        </main>
      </div>
    </div>
  );
}
