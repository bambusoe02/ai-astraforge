"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2 } from "lucide-react";

const screenshots = [
  {
    src: "/screenshots/dashboard.png",
    alt: "AstraForge Dashboard",
    title: "Interactive AI Agent Dashboard",
    description: "Real-time monitoring and interaction with specialized AI agents",
  },
  {
    src: "/screenshots/code-editor.png",
    alt: "Code Generation",
    title: "Real-time Cross-Platform Code Generation",
    description: "Monaco editor with live code generation across all platforms",
  },
  {
    src: "/screenshots/agents.png",
    alt: "AI Agents",
    title: "5 Specialized AI Agents Working in Parallel",
    description: "Architect, Coder, Tester, Deployer, and Monitor working together",
  },
  {
    src: "/screenshots/output.png",
    alt: "Generated Code",
    title: "Production-Ready Code Across 4 Platforms",
    description: "Next.js, FastAPI, React Native, and Chrome Extension code",
  },
];

export function ScreenshotsGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <>
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
              📸 See It In Action
            </h2>
            <p className="text-xl text-gray-300">
              Explore the AstraForge dashboard and features
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {screenshots.map((screenshot, index) => (
              <motion.div
                key={index}
                className="space-y-4 group cursor-pointer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedImage(index)}
              >
                <div className="relative overflow-hidden rounded-lg border border-gray-800 shadow-2xl group-hover:border-purple-500/50 transition-all">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all z-10" />
                  <div className="relative aspect-video bg-gray-900/50 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <span className="text-4xl">📸</span>
                        </div>
                        <p className="text-gray-400 text-sm">Screenshot placeholder</p>
                        <p className="text-gray-500 text-xs mt-2">{screenshot.alt}</p>
                      </div>
                    </div>
                    <Image
                      src={screenshot.src}
                      alt={screenshot.alt}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//9k="
                      onError={(e) => {
                        // Hide image on error, show placeholder
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-lg p-2">
                      <Maximize2 className="w-5 h-5 text-gray-300" />
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-100 mb-1">
                    {screenshot.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {screenshot.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                className="relative max-w-7xl max-h-[90vh] w-full"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-12 right-0 p-2 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all"
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>
                
                <div className="relative rounded-lg overflow-hidden border border-gray-800 shadow-2xl">
                  <Image
                    src={screenshots[selectedImage].src}
                    alt={screenshots[selectedImage].alt}
                    width={1600}
                    height={1200}
                    className="w-full h-auto max-h-[90vh] object-contain"
                    priority
                  />
                </div>
                
                <div className="mt-4 text-center">
                  <h3 className="text-xl font-semibold text-gray-100 mb-2">
                    {screenshots[selectedImage].title}
                  </h3>
                  <p className="text-gray-400">
                    {screenshots[selectedImage].description}
                  </p>
                </div>

                {/* Navigation */}
                {screenshots.length > 1 && (
                  <div className="flex items-center justify-center gap-4 mt-6">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(
                          selectedImage > 0 ? selectedImage - 1 : screenshots.length - 1
                        );
                      }}
                      className="px-4 py-2 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all"
                    >
                      ← Previous
                    </button>
                    <span className="text-gray-400 text-sm">
                      {selectedImage + 1} / {screenshots.length}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(
                          selectedImage < screenshots.length - 1 ? selectedImage + 1 : 0
                        );
                      }}
                      className="px-4 py-2 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

