"use client";

import Link from "next/link";
import { Github, Home } from "lucide-react";

export function TopBanner() {
  return (
    <div className="sticky top-0 z-50 bg-purple-500/10 border-b border-purple-500/20 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <p className="text-sm text-purple-200 flex items-center gap-2">
          <span className="animate-pulse">🚧</span>
          Demo Mode - Using Mock Data
        </p>
        <div className="flex gap-2">
          <a
            href="https://github.com/bambusoe02/ai-astraforge"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 text-sm bg-white/5 backdrop-blur-sm border border-white/20 text-white rounded-lg hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <Github className="w-4 h-4" />
            Star on GitHub
          </a>
          <Link
            href="/"
            className="px-3 py-1.5 text-sm bg-white/5 backdrop-blur-sm border border-white/20 text-white rounded-lg hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

