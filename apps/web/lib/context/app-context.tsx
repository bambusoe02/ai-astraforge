"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

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
  messages: Message[];
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  codeState: CodeState;
  setCodeState: (code: CodeState) => void;
  extractCodeFromMessage: (content: string) => { code: string; language: string; platform: "nextjs" | "fastapi" | "mobile" } | null;
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

// Helper function to safely access localStorage
function safeLocalStorageGet(key: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error);
    return null;
  }
}

function safeLocalStorageSet(key: string, value: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      console.error('localStorage quota exceeded. Clearing old data...');
      try {
        const projects = safeLocalStorageGet(STORAGE_KEY_PROJECTS);
        if (projects) {
          const parsed = JSON.parse(projects);
          if (Array.isArray(parsed) && parsed.length > 5) {
            const sorted = parsed.sort((a: any, b: any) => 
              new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime()
            );
            safeLocalStorageSet(STORAGE_KEY_PROJECTS, JSON.stringify(sorted.slice(0, 5)));
          }
        }
        localStorage.setItem(key, value);
        return true;
      } catch (retryError) {
        console.error('Failed to clear localStorage:', retryError);
        return false;
      }
    }
    console.error(`Error writing to localStorage (${key}):`, error);
    return false;
  }
}

// Validate project data structure
function validateProject(data: unknown): data is Project {
  if (!data || typeof data !== 'object') return false;
  const p = data as Partial<Project>;
  return (
    typeof p.id === 'string' &&
    typeof p.name === 'string' &&
    Array.isArray(p.messages) &&
    typeof p.codeState === 'object' &&
    p.codeState !== null &&
    typeof (p.codeState as CodeState).code === 'string' &&
    typeof (p.codeState as CodeState).language === 'string' &&
    typeof (p.codeState as CodeState).platform === 'string'
  );
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [codeState, setCodeState] = useState<CodeState>(defaultCodeState);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Use refs to prevent infinite loops
  const isSavingRef = useRef(false);
  const isLoadingRef = useRef(false);

  // Load projects and current project from localStorage on mount (only once)
  useEffect(() => {
    if (isLoadingRef.current || isInitialized) return;
    isLoadingRef.current = true;

    try {
      const savedProjects = safeLocalStorageGet(STORAGE_KEY_PROJECTS);
      let loadedProjects: Project[] = [];
      
      if (savedProjects) {
        try {
          const parsed = JSON.parse(savedProjects) as unknown[];
          
          // Validate and parse projects
          loadedProjects = parsed
            .filter(validateProject)
            .map((p) => ({
              ...p,
              messages: (p.messages || []).map((msg: any) => ({
                ...msg,
                timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date(),
              })),
              createdAt: p.createdAt ? new Date(p.createdAt) : new Date(),
              updatedAt: p.updatedAt ? new Date(p.updatedAt) : new Date(),
            }));
        } catch (parseError) {
          console.error('Error parsing projects from localStorage:', parseError);
          // Clear corrupted data
          safeLocalStorageSet(STORAGE_KEY_PROJECTS, JSON.stringify([]));
        }
      }

      setProjects(loadedProjects);

      const savedCurrentProjectId = safeLocalStorageGet(STORAGE_KEY_CURRENT_PROJECT);
      if (savedCurrentProjectId && loadedProjects.find((p) => p.id === savedCurrentProjectId)) {
        setCurrentProjectId(savedCurrentProjectId);
      } else if (loadedProjects.length > 0) {
        setCurrentProjectId(loadedProjects[0].id);
        safeLocalStorageSet(STORAGE_KEY_CURRENT_PROJECT, loadedProjects[0].id);
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    } finally {
      setIsInitialized(true);
      isLoadingRef.current = false;
    }
  }, [isInitialized]);

  // Load current project data when project changes (only after initialization)
  useEffect(() => {
    if (!isInitialized) return;
    
    if (currentProjectId) {
      const project = projects.find((p) => p.id === currentProjectId);
      if (project) {
        setMessages(project.messages);
        setCodeState(project.codeState);
      } else {
        // Project not found, reset to default
        setMessages([]);
        setCodeState(defaultCodeState);
      }
    } else {
      setMessages([]);
      setCodeState(defaultCodeState);
    }
  }, [currentProjectId, projects, isInitialized]);

  // Save current project data whenever messages or codeState changes (debounced)
  useEffect(() => {
    if (!isInitialized || !currentProjectId || isSavingRef.current) return;

    // Debounce saves to prevent excessive localStorage writes
    const timeoutId = setTimeout(() => {
      isSavingRef.current = true;
      
      setProjects((prevProjects) => {
        const project = prevProjects.find((p) => p.id === currentProjectId);
        if (!project) {
          isSavingRef.current = false;
          return prevProjects;
        }

        const updatedProject: Project = {
          ...project,
          messages,
          codeState,
          updatedAt: new Date(),
        };

        const updatedProjects = prevProjects.map((p) =>
          p.id === currentProjectId ? updatedProject : p
        );
        
        // Save to localStorage
        safeLocalStorageSet(
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
        
        isSavingRef.current = false;
        return updatedProjects;
      });
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [messages, codeState, currentProjectId, isInitialized]);

  const addMessage = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const createProject = useCallback((name: string): string => {
    const newProject: Project = {
      id: `project-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: name.trim(),
      messages: [],
      codeState: { ...defaultCodeState },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setProjects((prev) => {
      const updated = [...prev, newProject];
      safeLocalStorageSet(
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
      return updated;
    });

    setCurrentProjectId(newProject.id);
    safeLocalStorageSet(STORAGE_KEY_CURRENT_PROJECT, newProject.id);
    
    return newProject.id;
  }, []);

  const switchProject = useCallback((projectId: string) => {
    if (projects.find((p) => p.id === projectId)) {
      setCurrentProjectId(projectId);
      safeLocalStorageSet(STORAGE_KEY_CURRENT_PROJECT, projectId);
    }
  }, [projects]);

  const deleteProject = useCallback((projectId: string) => {
    setProjects((prev) => {
      const updated = prev.filter((p) => p.id !== projectId);
      safeLocalStorageSet(
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
      
      if (currentProjectId === projectId) {
        if (updated.length > 0) {
          setCurrentProjectId(updated[0].id);
          safeLocalStorageSet(STORAGE_KEY_CURRENT_PROJECT, updated[0].id);
        } else {
          setCurrentProjectId(null);
          safeLocalStorageSet(STORAGE_KEY_CURRENT_PROJECT, "");
        }
      }
      
      return updated;
    });
  }, [currentProjectId]);

  const clearCurrentProject = useCallback(() => {
    if (currentProjectId) {
      setMessages([]);
      setCodeState({ ...defaultCodeState });
    }
  }, [currentProjectId]);

  const getCurrentProject = useCallback((): Project | null => {
    if (!currentProjectId) return null;
    return projects.find((p) => p.id === currentProjectId) || null;
  }, [currentProjectId, projects]);

  const extractCodeFromMessage = useCallback((content: string): { code: string; language: string; platform: "nextjs" | "fastapi" | "mobile" } | null => {
    if (!content) return null;
    
    const codeBlockRegex = /```(\w+)?\s*\n?([\s\S]*?)```/g;
    const matches = Array.from(content.matchAll(codeBlockRegex));
    
    if (matches.length > 0) {
      const lastMatch = matches[matches.length - 1];
      let language = (lastMatch[1] || "typescript").toLowerCase();
      let code = lastMatch[2].trim();
      
      if (language === "ts" || language === "tsx") {
        language = "typescript";
      } else if (language === "py") {
        language = "python";
      } else if (language === "js" || language === "jsx") {
        language = "javascript";
      }
      
      let platform: "nextjs" | "fastapi" | "mobile" = "nextjs";
      
      if (language === "python" || language === "py") {
        platform = "fastapi";
      } else if (language === "typescript" || language === "tsx" || language === "javascript" || language === "jsx") {
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
