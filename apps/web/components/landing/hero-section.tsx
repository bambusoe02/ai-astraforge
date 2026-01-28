"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";
import { Button } from "@astraforge/ui";

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gray-950 flex items-center justify-center overflow-hidden">
      {/* Readability overlay (protects against bright gradients / glow) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/40" />

      <div className="relative container mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900/90 border border-gray-800 rounded-full mb-8">
          <span className="text-gray-300">🤖 AI-Powered Monorepo Factory</span>
        </div>

        {/* Headline */}
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-[0_10px_30px_rgba(0,0,0,0.65)]">
          Stop Building Apps
          <br />
          One Platform at a Time
        </h1>

        {/* Subheading */}
        <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-12 drop-shadow-[0_6px_18px_rgba(0,0,0,0.55)]">
          Generate production-ready monorepos across Web, API, Mobile, Extension in minutes, not months
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            asChild
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Link
              href="/dashboard"
              onClick={() => {
                track("demo_clicked", { location: "hero" });
              }}
            >
              Start Building Now →
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-gray-700 text-gray-100 hover:bg-gray-900"
          >
            <a
              href="https://github.com/bambusoe02/ai-astraforge"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                track("github_star_clicked", { location: "hero" });
              }}
            >
              ⭐ Star on GitHub
            </a>
          </Button>
        </div>

        {/* Terminal */}
        <div className="mt-16 max-w-2xl mx-auto bg-gray-900 border border-gray-800 rounded-lg p-6">
          <div className="flex gap-2 mb-4 justify-start">
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
          </div>
          <div className="font-mono text-sm text-left">
            <div className="text-gray-200">
              <span className="text-gray-400">$</span> astraforge create
            </div>
            <div className="text-gray-400 mt-2">
              <span className="text-green-400">✓</span> Architect: Planning system architecture...
            </div>
            <div className="text-gray-400">
              <span className="text-green-400">✓</span> Coder: Generating code across platforms...
            </div>
            <div className="text-gray-400">
              <span className="text-green-400">✓</span> Tester: Running automated tests...
            </div>
            <div className="text-gray-200 mt-2">
              <span className="text-purple-400">→</span> Ready in 4 minutes!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
