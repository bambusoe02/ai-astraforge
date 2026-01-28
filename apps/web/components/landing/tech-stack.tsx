"use client";

import { motion } from "framer-motion";

const techStack = [
  { name: "Turborepo", icon: "⚡" },
  { name: "Next.js 15", icon: "▲" },
  { name: "TypeScript", icon: "TS" },
  { name: "FastAPI", icon: "🐍" },
  { name: "React Native", icon: "📱" },
  { name: "Tailwind", icon: "🎨" },
  { name: "shadcn/ui", icon: "✨" },
  { name: "Vercel", icon: "▲" },
];

export function TechStack() {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-slate-950 via-purple-950/10 to-slate-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Built With Modern Tech
          </h2>
          <p className="text-xl text-gray-300">
            Production-ready stack trusted by developers
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              className="backdrop-blur-xl bg-gray-900/80 border border-gray-800 rounded-xl p-6 text-center hover:bg-gray-900/90 transition-all"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div className="text-4xl mb-3">{tech.icon}</div>
              <div className="text-gray-100 font-semibold">{tech.name}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

