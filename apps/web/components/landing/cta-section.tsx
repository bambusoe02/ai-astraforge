"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { track } from "@vercel/analytics";

export function CTASection() {
  return (
    <section className="py-24 px-6 bg-slate-950">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Ready to revolutionize your development workflow?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Join 100+ developers building faster with AI-powered monorepos
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              href="/dashboard"
              onClick={() => {
                track("demo_clicked", { location: "cta" });
              }}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-lg shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/50 transition-all transform hover:scale-105"
            >
              Start Building Now
            </Link>
            <a
              href="https://github.com/bambusoe02/ai-astraforge"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                track("github_star_clicked", { location: "cta" });
              }}
              className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-all"
            >
              Star on GitHub
            </a>
            <a
              href="#"
              className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-all"
            >
              View Documentation
            </a>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="pt-12 border-t border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400">
            <div>
              Built by{" "}
              <a
                href="https://github.com/bambusoe02"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                @bambusoe02
              </a>
            </div>
            <div className="flex gap-6">
              <span>MIT License</span>
              <a
                href="mailto:bambusoe@gmail.com"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                bambusoe@gmail.com
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
