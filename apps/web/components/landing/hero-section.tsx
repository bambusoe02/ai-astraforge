"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Blobs - Reduced opacity */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
              <span className="text-2xl">🌌</span>
              <span className="text-sm text-slate-300">AI-Powered Monorepo Factory</span>
            </div>
          </div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Stop Building Apps
            <br />
            One Platform at a Time
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Generate production-ready monorepos across Web, API, Mobile, and Extension in minutes, not months
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-lg shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/50 transition-all transform hover:scale-105"
            >
              Start Building Now →
            </Link>
            <a
              href="https://github.com/bambusoe02/ai-astraforge"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-all"
            >
              ⭐ Star on GitHub
            </a>
          </motion.div>

          {/* Code Generation Mockup */}
          <motion.div
            className="mt-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="backdrop-blur-xl bg-gray-900/80 border border-gray-800 rounded-2xl p-6 shadow-2xl">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
              <div className="font-mono text-sm text-left">
                <div className="text-purple-400">
                  <span className="text-cyan-400">$</span> astraforge create
                </div>
                <div className="text-slate-400 mt-2">
                  <span className="text-green-400">✓</span> Architect: Planning system architecture...
                </div>
                <div className="text-slate-400">
                  <span className="text-green-400">✓</span> Coder: Generating code across platforms...
                </div>
                <div className="text-slate-400">
                  <span className="text-green-400">✓</span> Tester: Running automated tests...
                </div>
                <div className="text-purple-400 mt-2">
                  <span className="text-cyan-400">→</span> Ready in 4 minutes!
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
