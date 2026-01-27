"use client";

import { useState } from "react";
import { AgentChat } from "./agent-chat";
import { CodeEditor } from "./code-editor";
import { ProjectStatus } from "./project-status";
import { AgentStatus } from "./agent-status";

export function Dashboard() {
  const [activeView, setActiveView] = useState<"chat" | "editor" | "status">("chat");

  const navItems = [
    { id: "chat", label: "AI Agents", icon: "🤖", gradient: "from-purple-500 to-pink-500" },
    { id: "editor", label: "Code Editor", icon: "💻", gradient: "from-blue-500 to-cyan-500" },
    { id: "status", label: "Status", icon: "📊", gradient: "from-green-500 to-emerald-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="relative flex h-screen">
        {/* Modern Sidebar with Glassmorphism */}
        <aside className="w-72 backdrop-blur-xl bg-white/5 border-r border-white/10 p-6 flex flex-col">
          {/* Logo Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50">
                <span className="text-2xl">🌌</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                  AstraForge
                </h1>
                <p className="text-xs text-slate-400">AI-Powered Factory</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id as any)}
                className={`group relative w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                  activeView === item.id
                    ? "bg-gradient-to-r " + item.gradient + " text-white shadow-lg shadow-purple-500/50 scale-105"
                    : "text-slate-300 hover:bg-white/5 hover:scale-102"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </div>
                {activeView === item.id && (
                  <div className="absolute inset-0 rounded-xl bg-white/10 blur-xl"></div>
                )}
              </button>
            ))}
          </nav>

          {/* Agent Status */}
          <div className="mt-auto">
            <AgentStatus />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden p-6">
          <div className="h-full backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
            {activeView === "chat" && <AgentChat />}
            {activeView === "editor" && <CodeEditor />}
            {activeView === "status" && <ProjectStatus />}
          </div>
        </main>
      </div>
    </div>
  );
}
