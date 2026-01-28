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
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-900 to-slate-950">
      {/* Header */}
      <div className="p-4 border-b border-white/10 backdrop-blur-sm bg-white/5">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white">Code Editor</h2>
            <div className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded text-xs text-purple-200">
              {currentPlatform?.label}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Platform Tabs */}
            <div className="flex gap-1 bg-white/5 rounded-lg p-1 border border-white/10">
              {platforms.map((p) => (
                <button
                  key={p.value}
                  onClick={() => handlePlatformChange(p.value)}
                  className={`px-3 py-1.5 text-sm rounded transition-all ${
                    platform === p.value
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      : "text-slate-300 hover:bg-white/5"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Actions */}
            <button
              onClick={handleGenerateCode}
              disabled={isGenerating}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2"
            >
              <Sparkles className={`w-4 h-4 ${isGenerating ? "animate-spin" : ""}`} />
              {isGenerating ? "Generating..." : "Generate"}
            </button>

            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-white/5 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-all flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy"}
            </button>

            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-white/5 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </button>

            <button
              onClick={handleSave}
              className="px-4 py-2 bg-white/5 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-all flex items-center gap-2"
            >
              {saved ? <Check className="w-4 h-4 text-green-400" /> : <Save className="w-4 h-4" />}
              {saved ? "Saved!" : "Save"}
            </button>

            <button
              onClick={handleRun}
              className="px-4 py-2 bg-green-500/20 border border-green-500/30 text-green-200 rounded-lg hover:bg-green-500/30 transition-all flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              Run
            </button>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          language={language}
          value={code}
          theme={theme}
          onChange={(value) => setCode(value || "")}
          options={{
            minimap: { enabled: true },
            fontSize: 14,
            lineNumbers: "on",
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            wordWrap: "on",
            padding: { top: 16, bottom: 16 },
            fontFamily: "'Fira Code', 'Courier New', monospace",
            fontLigatures: true,
          }}
        />
      </div>
    </div>
  );
}
