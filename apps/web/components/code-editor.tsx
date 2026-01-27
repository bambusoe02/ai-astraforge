"use client";

import { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
// import { Card, CardContent, CardHeader, CardTitle } from "@astraforge/ui";
// import { Button } from "@astraforge/ui";
// import { Play, Save, Download } from "lucide-react";

export function CodeEditor() {
  const [code, setCode] = useState(`// Welcome to AstraForge Code Editor
// This editor supports multi-file editing across platforms

function helloWorld() {
  console.log("Hello from AstraForge!");
}

helloWorld();`);

  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("vs-dark");
  const [platform, setPlatform] = useState("nextjs");
  const [isGenerating, setIsGenerating] = useState(false);

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

  const handleRun = () => {
    // Simulate running code
    console.log("Running code:", code);
  };

  const handleSave = async () => {
    // Simulate saving code with delay
      const { simulateApiDelay } = await import("../lib/mock-data");
    await simulateApiDelay(500);
    console.log("Saving code:", code);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `astraforge-code.${language}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full space-y-4">
      <div className="bg-slate-800 border border-slate-700 rounded-lg">
        <div className="p-6 border-b border-slate-700">
          <div className="text-white flex items-center justify-between">
            <span className="text-xl font-semibold">Multi-Platform Code Editor</span>
            <div className="flex gap-2">
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="bg-slate-700 border border-slate-600 rounded px-3 py-1 text-sm text-white"
              >
                <option value="nextjs">Next.js</option>
                <option value="fastapi">FastAPI</option>
                <option value="mobile">React Native</option>
              </select>
              <button 
                onClick={handleGenerateCode}
                disabled={isGenerating}
                className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded text-sm text-white flex items-center disabled:opacity-50"
              >
                {isGenerating ? "⏳ Generating..." : "✨ Generate Code"}
              </button>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-slate-700 border border-slate-600 rounded px-3 py-1 text-sm text-white"
              >
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="rust">Rust</option>
                <option value="go">Go</option>
                <option value="java">Java</option>
              </select>
              <button onClick={handleRun} className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm text-white flex items-center">
                ▶️ Run
              </button>
              <button onClick={handleSave} className="bg-slate-700 border border-slate-600 px-3 py-1 rounded text-sm text-white flex items-center">
                💾 Save
              </button>
              <button onClick={handleDownload} className="bg-slate-700 border border-slate-600 px-3 py-1 rounded text-sm text-white flex items-center">
                📥 Download
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="h-96 border border-slate-600 rounded-lg overflow-hidden">
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
              }}
            />
          </div>
        </div>
      </div>

      {/* File Explorer */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg">
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-white text-xl font-semibold">Project Files</h2>
        </div>
        <div className="p-6">
          <div className="space-y-1 text-sm">
            <div className="text-slate-300">📁 apps/</div>
            <div className="ml-4 text-slate-400">📁 web/ (Next.js)</div>
            <div className="ml-4 text-slate-400">📁 api/ (FastAPI)</div>
            <div className="ml-4 text-slate-400">📁 mobile/ (React Native)</div>
            <div className="ml-4 text-slate-400">📁 extension/ (Chrome)</div>
            <div className="text-slate-300">📁 packages/</div>
            <div className="ml-4 text-slate-400">📁 ai-agents/</div>
            <div className="ml-4 text-slate-400">📁 ui/</div>
          </div>
        </div>
      </div>
    </div>
  );
}
