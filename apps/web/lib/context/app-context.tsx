"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface Message {
  id: string;
  role: "user" | "agent";
  content: string;
  agent?: "architect" | "coder" | "tester" | "deployer" | "monitor";
  timestamp: Date;
}

interface CodeState {
  code: string;
  language: string;
  platform: string;
}

interface AppContextType {
  messages: Message[];
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  codeState: CodeState;
  setCodeState: (code: CodeState) => void;
  extractCodeFromMessage: (content: string) => { code: string; language: string; platform: "nextjs" | "fastapi" | "mobile" } | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_MESSAGES = "astraforge_messages";
const STORAGE_KEY_CODE = "astraforge_code";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [codeState, setCodeState] = useState<CodeState>({
    code: `// Welcome to AstraForge Code Editor
// Code generated from chat will appear here

function helloWorld() {
  // Your code will appear here
}

helloWorld();`,
    language: "typescript",
    platform: "nextjs",
  });

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedMessages = localStorage.getItem(STORAGE_KEY_MESSAGES);
      if (savedMessages) {
        const parsed = JSON.parse(savedMessages) as Array<{
          id: string;
          role: "user" | "agent";
          content: string;
          agent?: "architect" | "coder" | "tester" | "deployer" | "monitor";
          timestamp: string;
        }>;
        setMessages(
          parsed.map((msg) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          }))
        );
      }

      const savedCode = localStorage.getItem(STORAGE_KEY_CODE);
      if (savedCode) {
        setCodeState(JSON.parse(savedCode));
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    }
  }, []);

  // Save to localStorage whenever messages change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(messages));
    } catch (error) {
      console.error("Error saving messages to localStorage:", error);
    }
  }, [messages]);

  // Save to localStorage whenever code changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CODE, JSON.stringify(codeState));
    } catch (error) {
      console.error("Error saving code to localStorage:", error);
    }
  }, [codeState]);

  const addMessage = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY_MESSAGES);
  }, []);

  // Extract code blocks from message content
  const extractCodeFromMessage = useCallback((content: string): { code: string; language: string; platform: "nextjs" | "fastapi" | "mobile" } | null => {
    if (!content) return null;
    
    // Match code blocks: ```language\ncode\n``` or ```language code ```
    // Handles both single-line and multi-line code blocks
    const codeBlockRegex = /```(\w+)?\s*\n?([\s\S]*?)```/g;
    const matches = Array.from(content.matchAll(codeBlockRegex));
    
    if (matches.length > 0) {
      // Get the last code block (most recent)
      const lastMatch = matches[matches.length - 1];
      let language = (lastMatch[1] || "typescript").toLowerCase();
      let code = lastMatch[2].trim();
      
      // Normalize language identifiers
      if (language === "ts" || language === "tsx") {
        language = "typescript";
      } else if (language === "py") {
        language = "python";
      } else if (language === "js" || language === "jsx") {
        language = "javascript";
      }
      
      // Determine platform based on language and code content
      let platform: "nextjs" | "fastapi" | "mobile" = "nextjs";
      
      if (language === "python" || language === "py") {
        platform = "fastapi";
      } else if (language === "typescript" || language === "tsx" || language === "javascript" || language === "jsx") {
        // Check if it's React Native code
        const codeLower = code.toLowerCase();
        if (
          codeLower.includes("react-native") ||
          codeLower.includes("from 'react-native'") ||
          codeLower.includes('from "react-native"') ||
          codeLower.includes("import { view") ||
          codeLower.includes("import { text") ||
          codeLower.includes("react-native/") ||
          codeLower.includes("expo")
        ) {
          platform = "mobile";
        } else {
          platform = "nextjs";
        }
      }
      
      return { code, language, platform };
    }
    
    return null;
  }, []);

  return (
    <AppContext.Provider
      value={{
        messages,
        addMessage,
        clearMessages,
        codeState,
        setCodeState,
        extractCodeFromMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

