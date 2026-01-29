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

interface Project {
  id: string;
  name: string;
  messages: Message[];
  codeState: CodeState;
  createdAt: Date;
  updatedAt: Date;
}

interface AppContextType {
  // Current project data
  messages: Message[];
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  codeState: CodeState;
  setCodeState: (code: CodeState) => void;
  extractCodeFromMessage: (content: string) => { code: string; language: string; platform: "nextjs" | "fastapi" | "mobile" } | null;
  
  // Project management
  projects: Project[];
  currentProjectId: string | null;
  createProject: (name: string) => string;
  switchProject: (projectId: string) => void;
  deleteProject: (projectId: string) => void;
  clearCurrentProject: () => void;
  getCurrentProject: () => Project | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_PROJECTS = "astraforge_projects";
const STORAGE_KEY_CURRENT_PROJECT = "astraforge_current_project";

const defaultCodeState: CodeState = {
  code: `// Welcome to AstraForge Code Editor
// Code generated from chat will appear here

function helloWorld() {
  // Your code will appear here
}

helloWorld();`,
  language: "typescript",
  platform: "nextjs",
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [codeState, setCodeState] = useState<CodeState>(defaultCodeState);

  // Load projects and current project from localStorage on mount
  useEffect(() => {
    try {
      const savedProjects = localStorage.getItem(STORAGE_KEY_PROJECTS);
      if (savedProjects) {
        const parsed = JSON.parse(savedProjects) as Array<{
          id: string;
          name: string;
          messages: Array<{
            id: string;
            role: "user" | "agent";
            content: string;
            agent?: "architect" | "coder" | "tester" | "deployer" | "monitor";
            timestamp: string;
          }>;
          codeState: CodeState;
          createdAt: string;
          updatedAt: string;
        }>;
        
        const loadedProjects: Project[] = parsed.map((p) => ({
          ...p,
          messages: p.messages.map((msg) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })),
          createdAt: new Date(p.createdAt),
          updatedAt: new Date(p.updatedAt),
        }));
        
        setProjects(loadedProjects);
      }

      const savedCurrentProjectId = localStorage.getItem(STORAGE_KEY_CURRENT_PROJECT);
      if (savedCurrentProjectId && loadedProjects.find((p) => p.id === savedCurrentProjectId)) {
        setCurrentProjectId(savedCurrentProjectId);
      } else if (loadedProjects.length > 0) {
        // If no current project but projects exist, use first one
        setCurrentProjectId(loadedProjects[0].id);
        localStorage.setItem(STORAGE_KEY_CURRENT_PROJECT, loadedProjects[0].id);
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    }
  }, []);

  // Load current project data when project changes
  useEffect(() => {
    if (currentProjectId && projects.length > 0) {
      const project = projects.find((p) => p.id === currentProjectId);
      if (project) {
        setMessages(project.messages);
        setCodeState(project.codeState);
      }
    } else if (!currentProjectId) {
      setMessages([]);
      setCodeState(defaultCodeState);
    }
  }, [currentProjectId, projects]);

  // Save current project data whenever messages or codeState changes
  useEffect(() => {
    if (currentProjectId) {
      setProjects((prevProjects) => {
        const updatedProjects = prevProjects.map((p) =>
          p.id === currentProjectId
            ? {
                ...p,
                messages,
                codeState,
                updatedAt: new Date(),
              }
            : p
        );
        
        // Save to localStorage
        try {
          localStorage.setItem(
            STORAGE_KEY_PROJECTS,
            JSON.stringify(
              updatedProjects.map((p) => ({
                ...p,
                messages: p.messages.map((msg) => ({
                  ...msg,
                  timestamp: msg.timestamp.toISOString(),
                })),
                createdAt: p.createdAt.toISOString(),
                updatedAt: p.updatedAt.toISOString(),
              }))
            )
          );
        } catch (error) {
          console.error("Error saving projects to localStorage:", error);
        }
        
        return updatedProjects;
      });
    }
  }, [messages, codeState, currentProjectId]);

  const addMessage = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const createProject = useCallback((name: string): string => {
    const newProject: Project = {
      id: `project-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      messages: [],
      codeState: defaultCodeState,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setProjects((prev) => {
      const updated = [...prev, newProject];
      try {
        localStorage.setItem(
          STORAGE_KEY_PROJECTS,
          JSON.stringify(
            updated.map((p) => ({
              ...p,
              messages: p.messages.map((msg) => ({
                ...msg,
                timestamp: msg.timestamp.toISOString(),
              })),
              createdAt: p.createdAt.toISOString(),
              updatedAt: p.updatedAt.toISOString(),
            }))
          )
        );
      } catch (error) {
        console.error("Error saving projects to localStorage:", error);
      }
      return updated;
    });

    setCurrentProjectId(newProject.id);
    localStorage.setItem(STORAGE_KEY_CURRENT_PROJECT, newProject.id);
    
    return newProject.id;
  }, []);

  const switchProject = useCallback((projectId: string) => {
    setCurrentProjectId(projectId);
    localStorage.setItem(STORAGE_KEY_CURRENT_PROJECT, projectId);
  }, []);

  const deleteProject = useCallback((projectId: string) => {
    setProjects((prev) => {
      const updated = prev.filter((p) => p.id !== projectId);
      try {
        localStorage.setItem(
          STORAGE_KEY_PROJECTS,
          JSON.stringify(
            updated.map((p) => ({
              ...p,
              messages: p.messages.map((msg) => ({
                ...msg,
                timestamp: msg.timestamp.toISOString(),
              })),
              createdAt: p.createdAt.toISOString(),
              updatedAt: p.updatedAt.toISOString(),
            }))
          )
        );
      } catch (error) {
        console.error("Error saving projects to localStorage:", error);
      }
      
      // If deleted project was current, switch to first available or null
      if (currentProjectId === projectId) {
        if (updated.length > 0) {
          setCurrentProjectId(updated[0].id);
          localStorage.setItem(STORAGE_KEY_CURRENT_PROJECT, updated[0].id);
        } else {
          setCurrentProjectId(null);
          localStorage.removeItem(STORAGE_KEY_CURRENT_PROJECT);
        }
      }
      
      return updated;
    });
  }, [currentProjectId]);

  const clearCurrentProject = useCallback(() => {
    if (currentProjectId) {
      setMessages([]);
      setCodeState(defaultCodeState);
    }
  }, [currentProjectId]);

  const getCurrentProject = useCallback((): Project | null => {
    if (!currentProjectId) return null;
    return projects.find((p) => p.id === currentProjectId) || null;
  }, [currentProjectId, projects]);

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
        projects,
        currentProjectId,
        createProject,
        switchProject,
        deleteProject,
        clearCurrentProject,
        getCurrentProject,
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

