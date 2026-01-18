"use client";

import { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import { Card, CardContent, CardHeader, CardTitle } from "@astraforge/ui";
import { Button } from "@astraforge/ui";
import { Play, Save, Download } from "lucide-react";

export function CodeEditor() {
  const [code, setCode] = useState(`// Welcome to AstraForge Code Editor
// This editor supports multi-file editing across platforms

function helloWorld() {
  console.log("Hello from AstraForge!");
}

helloWorld();`);

  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("vs-dark");

  const handleRun = () => {
    // Simulate running code
    console.log("Running code:", code);
  };

  const handleSave = () => {
    // Simulate saving code
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
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <span>Multi-Platform Code Editor</span>
            <div className="flex gap-2">
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
              <Button onClick={handleRun} size="sm" className="bg-green-600 hover:bg-green-700">
                <Play className="w-4 h-4 mr-1" />
                Run
              </Button>
              <Button onClick={handleSave} size="sm" variant="outline">
                <Save className="w-4 h-4 mr-1" />
                Save
              </Button>
              <Button onClick={handleDownload} size="sm" variant="outline">
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>

      {/* File Explorer */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Project Files</CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
}
