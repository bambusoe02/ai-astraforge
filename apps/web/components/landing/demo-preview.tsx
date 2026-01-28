"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function DemoPreview() {
  return (
    <section className="py-24 px-6 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            See It In Action
          </h2>
          <p className="text-xl text-slate-400">
            Interactive dashboard with real-time AI agents
          </p>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Dashboard Mockup */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="flex gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>
            
            {/* Mockup Content */}
            <div className="bg-slate-900/50 rounded-xl p-6 border border-white/10">
              <div className="flex gap-4 mb-6">
                <div className="w-64 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-white/10 p-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg"></div>
                    <div className="text-white font-bold">AstraForge</div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-10 bg-white/10 rounded-lg"></div>
                    <div className="h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"></div>
                    <div className="h-10 bg-white/10 rounded-lg"></div>
                  </div>
                </div>
                <div className="flex-1 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-white/10 p-6">
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-4xl">💬</span>
                      </div>
                      <p className="text-slate-400">AI Agent Chat</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Badge */}
            <div className="mt-6 flex items-center justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20">
                <span className="text-sm text-yellow-200">🚧 Interactive Demo - Full API integration coming soon</span>
              </div>
            </div>
            <div className="mt-2 text-center">
              <p className="text-xs text-slate-400">Currently showing: Mock data and simulated agent responses</p>
            </div>

            {/* CTA Button */}
            <div className="mt-8 flex justify-center">
              <Link
                href="/dashboard"
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-lg shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/50 transition-all transform hover:scale-105"
              >
                See It In Action →
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
