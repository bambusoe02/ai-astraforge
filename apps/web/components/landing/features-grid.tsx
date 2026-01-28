"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: "🤖",
    title: "5 AI Agents",
    items: [
      { name: "Architect", desc: "System design" },
      { name: "Coder", desc: "Cross-platform generation" },
      { name: "Tester", desc: "Automated QA" },
      { name: "Deployer", desc: "CI/CD automation" },
      { name: "Monitor", desc: "Health tracking" },
    ],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: "🌐",
    title: "4 Platforms",
    items: [
      { name: "Next.js", desc: "Web dashboard" },
      { name: "FastAPI", desc: "Backend API" },
      { name: "React Native", desc: "Mobile" },
      { name: "Chrome Extension", desc: "Browser extension" },
    ],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: "⚡",
    title: "4 Minutes",
    items: [
      { name: "Natural language", desc: "Input" },
      { name: "Instant architecture", desc: "Planning" },
      { name: "Production-ready", desc: "Code" },
      { name: "Auto-deployment", desc: "Ready" },
    ],
    gradient: "from-green-500 to-emerald-500",
  },
];

export function FeaturesGrid() {
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
            Everything You Need
          </h2>
          <p className="text-xl text-slate-400">
            Powerful AI agents working together to build your app
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center text-3xl mb-6 shadow-lg`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">{feature.title}</h3>
              <ul className="space-y-4">
                {feature.items.map((item) => (
                  <li key={item.name} className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.gradient} mt-2 flex-shrink-0`}></div>
                    <div>
                      <div className="text-white font-medium">{item.name}</div>
                      <div className="text-slate-400 text-sm">{item.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

