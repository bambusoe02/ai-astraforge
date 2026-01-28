"use client";

import { motion } from "framer-motion";

export function SkeletonLoader({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="h-4 bg-white/10 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-white/10 rounded w-1/2"></div>
    </div>
  );
}

export function ChatSkeleton() {
  return (
    <div className="space-y-4 p-6">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="flex gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="w-10 h-10 bg-white/10 rounded-xl flex-shrink-0"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-white/10 rounded w-1/4"></div>
            <div className="h-4 bg-white/10 rounded w-3/4"></div>
            <div className="h-4 bg-white/10 rounded w-1/2"></div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function AgentStatusSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
          <div className="w-8 h-8 bg-white/10 rounded-lg"></div>
          <div className="flex-1">
            <div className="h-3 bg-white/10 rounded w-20 mb-1"></div>
            <div className="h-2 bg-white/10 rounded w-32"></div>
          </div>
          <div className="w-12 h-5 bg-white/10 rounded"></div>
        </div>
      ))}
    </div>
  );
}

