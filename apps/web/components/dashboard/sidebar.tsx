"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Code, BarChart3, FolderOpen, Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { track } from "@vercel/analytics";
import { AgentStatus } from "../agent-status";

interface SidebarProps {
  activeView: "chat" | "editor" | "status" | "projects";
  onViewChange: (view: "chat" | "editor" | "status" | "projects") => void;
}

const navItems = [
  { 
    id: "chat" as const, 
    label: "AI Agents", 
    icon: MessageSquare,
    gradient: "from-purple-500 to-pink-500",
    tooltip: "Chat with AI agents"
  },
  { 
    id: "editor" as const, 
    label: "Code Editor", 
    icon: Code,
    gradient: "from-blue-500 to-cyan-500",
    tooltip: "Multi-platform code editor"
  },
  { 
    id: "projects" as const, 
    label: "Projects", 
    icon: FolderOpen,
    gradient: "from-orange-500 to-red-500",
    tooltip: "Manage your projects"
  },
  { 
    id: "status" as const, 
    label: "Status", 
    icon: BarChart3,
    gradient: "from-green-500 to-emerald-500",
    tooltip: "Project status & monitoring"
  },
];

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Close mobile menu on view change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [activeView]);

  return (
    <>
      {/* Mobile Menu Button - Larger tap target */}
      <button
        className="lg:hidden fixed top-14 left-4 z-50 p-3 min-w-[44px] min-h-[44px] bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white touch-manipulation"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle menu"
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Desktop Sidebar */}
      <motion.aside
        className={`hidden lg:flex flex-col backdrop-blur-xl bg-gray-950/95 border-r border-gray-800 transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-72"
        }`}
        initial={false}
        animate={{ width: isCollapsed ? 80 : 288 }}
      >
        {/* Logo Section */}
        <div className="p-4 lg:p-6 border-b border-gray-800">
          <div className={`flex items-center gap-3 ${isCollapsed ? "justify-center" : ""}`}>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50 flex-shrink-0">
              <span className="text-2xl">🌌</span>
            </div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                    AstraForge
                  </h1>
                  <p className="text-xs text-slate-400">AI-Powered Factory</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            const Icon = item.icon;
            const gradientClass = isActive 
              ? item.gradient === "from-purple-500 to-pink-500" ? "bg-gradient-to-r from-purple-500 to-pink-500"
              : item.gradient === "from-blue-500 to-cyan-500" ? "bg-gradient-to-r from-blue-500 to-cyan-500"
              : "bg-gradient-to-r from-green-500 to-emerald-500"
              : "";

            return (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => {
                    onViewChange(item.id);
                    track("dashboard_view_changed", { view: item.id });
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 min-h-[44px] rounded-xl transition-all duration-300 touch-manipulation ${
                    isActive
                      ? `${gradientClass} text-white shadow-lg shadow-purple-500/50 scale-105`
                      : "text-gray-300 lg:hover:bg-gray-800/50 lg:hover:scale-102 active:bg-gray-800/50"
                  } ${isCollapsed ? "justify-center" : ""}`}
                  title={isCollapsed ? item.tooltip : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        className="font-medium"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
                {isActive && !isCollapsed && (
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </div>
            );
          })}
        </nav>

        {/* Agent Status */}
        <div className="mt-auto border-t border-gray-800 p-4">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <AgentStatus />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Collapse Button - Desktop only */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 p-1.5 min-w-[32px] min-h-[32px] bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all touch-manipulation"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.aside
              className="fixed left-0 top-0 bottom-0 w-72 max-w-[85vw] backdrop-blur-xl bg-gray-950/95 border-r border-gray-800 z-50 lg:hidden flex flex-col"
              initial={{ x: -288 }}
              animate={{ x: 0 }}
              exit={{ x: -288 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="p-4 border-b border-gray-800">
                <div className="flex items-center gap-3">
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
              <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {navItems.map((item) => {
                  const isActive = activeView === item.id;
                  const Icon = item.icon;
                  const gradientClass = isActive 
                    ? item.gradient === "from-purple-500 to-pink-500" ? "bg-gradient-to-r from-purple-500 to-pink-500"
                    : item.gradient === "from-blue-500 to-cyan-500" ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                    : item.gradient === "from-orange-500 to-red-500" ? "bg-gradient-to-r from-orange-500 to-red-500"
                    : "bg-gradient-to-r from-green-500 to-emerald-500"
                    : "";
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onViewChange(item.id);
                        setIsMobileOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 min-h-[44px] rounded-xl transition-all duration-300 touch-manipulation ${
                        isActive
                          ? `${gradientClass} text-white shadow-lg shadow-purple-500/50`
                          : "text-gray-300 active:bg-gray-800/50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
              <div className="border-t border-gray-800 p-4">
                <AgentStatus />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
