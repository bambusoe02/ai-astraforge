"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Copy, Download, Play, Save, Sparkles, Check } from "lucide-react";
import { motion } from "framer-motion";

const platforms = [
  { value: "nextjs", label: "Next.js", language: "typescript" },
  { value: "fastapi", label: "FastAPI", language: "python" },
  { value: "mobile", label: "React Native", language: "typescript" },
];

export function CodeEditor() {
  const [code, setCode] = useState(`// Welcome to AstraForge Code Editor
// This editor supports multi-file editing across platforms

function helloWorld() {
  console.log("Hello from AstraForge!");
}

helloWorld();`);

  const [platform, setPlatform] = useState("nextjs");
  const [language, setLanguage] = useState("typescript");
  const [theme] = useState("vs-dark");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const currentPlatform = platforms.find((p) => p.value === platform);

  const handleGenerateCode = async () => {
    setIsGenerating(true);
    try {
      const { mockApi } = await import("../lib/mock-data");
      const generatedCode = await mockApi.generateCode(platform);
      setCode(generatedCode.code);
      setLanguage(generatedCode.language);
    } catch (error) {
      console.error("Error generating code:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const extension = language === "python" ? "py" : language === "typescript" ? "tsx" : "js";
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `astraforge-code.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSave = async () => {
    const { simulateApiDelay } = await import("../lib/mock-data");
    await simulateApiDelay(500);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleRun = () => {
    console.log("Running code:", code);
  };

  const handlePlatformChange = (newPlatform: string) => {
    setPlatform(newPlatform);
    const platformData = platforms.find((p) => p.value === newPlatform);
    if (platformData) {
      setLanguage(platformData.language);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-950 overflow-hidden">
      {/* Header - Compact on mobile */}
      <div className="p-3 sm:p-4 border-b border-gray-800 backdrop-blur-sm bg-gray-900/90 flex-shrink-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <h2 className="text-lg sm:text-xl font-bold text-gray-100">Code Editor</h2>
            <div className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded text-xs text-purple-200">
              {currentPlatform?.label}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {/* Platform Tabs - Compact on mobile */}
            <div className="flex gap-1 bg-gray-800/80 rounded-lg p-1 border border-gray-700 w-full sm:w-auto">
              {platforms.map((p) => (
                <button
                  key={p.value}
                  onClick={() => handlePlatformChange(p.value)}
                  className={`flex-1 sm:flex-none px-2 sm:px-3 py-1.5 min-h-[44px] text-xs sm:text-sm rounded transition-all touch-manipulation ${
                    platform === p.value
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      : "text-gray-300 active:bg-gray-700/50"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Actions - Icon only on mobile */}
            <button
              onClick={handleGenerateCode}
              disabled={isGenerating}
              className="px-3 sm:px-4 py-2 min-h-[44px] bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed active:shadow-lg active:shadow-purple-500/50 transition-all flex items-center gap-2 touch-manipulation"
            >
              <Sparkles className={`w-4 h-4 ${isGenerating ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">{isGenerating ? "Generating..." : "Generate"}</span>
            </button>

            <button
              onClick={handleCopy}
              className="px-3 py-2 min-h-[44px] bg-gray-800/80 border border-gray-700 text-gray-100 rounded-lg active:bg-gray-700/50 transition-all flex items-center gap-2 touch-manipulation"
              title="Copy code"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? "Copied!" : "Copy"}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-3 py-2 min-h-[44px] bg-gray-800/80 border border-gray-700 text-gray-100 rounded-lg active:bg-gray-700/50 transition-all flex items-center gap-2 touch-manipulation"
              title="Download code"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download</span>
            </button>

            <button
              onClick={handleSave}
              className="px-3 py-2 min-h-[44px] bg-gray-800/80 border border-gray-700 text-gray-100 rounded-lg active:bg-gray-700/50 transition-all flex items-center gap-2 touch-manipulation"
              title="Save code"
            >
              {saved ? <Check className="w-4 h-4 text-green-400" /> : <Save className="w-4 h-4" />}
              <span className="hidden sm:inline">{saved ? "Saved!" : "Save"}</span>
            </button>

            <button
              onClick={handleRun}
              className="px-3 py-2 min-h-[44px] bg-green-500/20 border border-green-500/30 text-green-200 rounded-lg active:bg-green-500/30 transition-all flex items-center gap-2 touch-manipulation"
              title="Run code"
            >
              <Play className="w-4 h-4" />
              <span className="hidden sm:inline">Run</span>
            </button>
          </div>
        </div>
      </div>

      {/* Editor - Horizontal scroll on mobile */}
      <div className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 overflow-x-auto">
          <Editor
            height="100%"
            language={language}
            value={code}
            theme={theme}
            onChange={(value) => setCode(value || "")}
            options={{
              minimap: { enabled: false }, // Disable minimap on mobile
              fontSize: 12, // Smaller font on mobile
              lineNumbers: "on",
              roundedSelection: false,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              insertSpaces: true,
              wordWrap: "off", // Allow horizontal scroll
              padding: { top: 16, bottom: 16 },
              fontFamily: "'Fira Code', 'Courier New', monospace",
              fontLigatures: true,
            }}
            className="min-w-full"
          />
        </div>
      </div>
    </div>
  );
}
