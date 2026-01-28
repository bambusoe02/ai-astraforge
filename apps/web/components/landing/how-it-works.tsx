"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "1",
    title: "Describe",
    description: "Tell us what you want to build in plain English",
    icon: "💬",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    number: "2",
    title: "Architect",
    description: "AI plans your entire system architecture",
    icon: "🏗️",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    number: "3",
    title: "Coder",
    description: "Generates production-ready code across all platforms",
    icon: "💻",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    number: "4",
    title: "Deploy",
    description: "Your monorepo is ready for production deployment",
    icon: "🚀",
    gradient: "from-orange-500 to-red-500",
  },
];

export function HowItWorks() {
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
            How It Works
          </h2>
          <p className="text-xl text-gray-300">
            From idea to production in 4 simple steps
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line (hidden on mobile) */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"></div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className="relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="backdrop-blur-xl bg-gray-900/80 border border-gray-800 rounded-2xl p-8 text-center hover:bg-gray-900/90 transition-all">
                  <div className={`w-20 h-20 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center text-4xl mb-6 mx-auto shadow-lg`}>
                    {step.icon}
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center text-xl font-bold text-white mb-4 mx-auto shadow-lg`}>
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-100 mb-2">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
