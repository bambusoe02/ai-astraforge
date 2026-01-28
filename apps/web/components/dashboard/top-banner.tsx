"use client";

import Link from "next/link";
import { Github, Home } from "lucide-react";

export function TopBanner() {
  return (
    <div className="sticky top-0 z-50 bg-purple-500/10 border-b border-purple-500/20 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 py-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <p className="text-xs sm:text-sm text-purple-200 flex items-center gap-2">
            <span className="animate-pulse">🚧</span>
            <span className="hidden sm:inline">Interactive Demo - Full API integration coming soon</span>
            <span className="sm:hidden">Interactive Demo</span>
          </p>
          <p className="text-xs text-slate-400 hidden sm:inline">
            Currently showing: Mock data and simulated agent responses
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <a
            href="https://github.com/bambusoe02/ai-astraforge"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none px-3 py-2 min-h-[44px] text-xs sm:text-sm bg-white/5 backdrop-blur-sm border border-white/20 text-white rounded-lg active:bg-white/10 transition-all flex items-center justify-center gap-2 touch-manipulation"
          >
            <Github className="w-4 h-4" />
            <span className="hidden sm:inline">Star on GitHub</span>
            <span className="sm:hidden">GitHub</span>
          </a>
          <Link
            href="/"
            className="flex-1 sm:flex-none px-3 py-2 min-h-[44px] text-xs sm:text-sm bg-white/5 backdrop-blur-sm border border-white/20 text-white rounded-lg active:bg-white/10 transition-all flex items-center justify-center gap-2 touch-manipulation"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
