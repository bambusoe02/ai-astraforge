"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function Navbar() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50">
              <span className="text-xl">🌌</span>
            </div>
            <div>
              <div className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                AstraForge
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <a
              href="https://github.com/bambusoe02/ai-astraforge"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/20 text-white rounded-lg hover:bg-white/10 transition-all"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

