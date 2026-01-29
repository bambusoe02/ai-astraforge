"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";
import { track } from "@vercel/analytics";
import { useApp } from "../lib/context/app-context";

interface Message {
  id: string;
  role: "user" | "agent";
  content: string;
  agent?: "architect" | "coder" | "tester" | "deployer" | "monitor";
  timestamp: Date;
}

export function AgentChat() {
  const { messages, addMessage, extractCodeFromMessage, setCodeState } = useApp();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    addMessage(userMessage);
    const messageText = input;
    setInput("");
    setIsLoading(true);

    // Track message sent
    track("agent_message_sent", {
      message_length: messageText.length,
      timestamp: new Date().toISOString(),
    });

    try {
      const { api } = await import("../lib/api");
      const responses = await api.sendMessage(messageText);

      responses.forEach((response) => {
        // Check if response has an error
        if (response.error && !response.message) {
          const errorMessage: Message = {
            id: `${Date.now()}-error`,
            role: "agent",
            content: `❌ **Error**: ${response.error}\n\nPlease check your API configuration or try again later.`,
            agent: (response.agent || "coder") as "architect" | "coder" | "tester" | "deployer" | "monitor",
            timestamp: new Date(response.timestamp || Date.now()),
          };
          addMessage(errorMessage);
          return;
        }

        const agentMessage: Message = {
          id: `${Date.now()}-${response.agent}`,
          role: "agent",
          content: response.message || response.error || "No response received",
          agent: (response.agent || "coder") as "architect" | "coder" | "tester" | "deployer" | "monitor",
          timestamp: new Date(response.timestamp),
        };
        addMessage(agentMessage);
        
        // Check if response contains code and extract it
        const messageContent = response.message || "";
        const extractedCode = extractCodeFromMessage(messageContent);
        if (extractedCode) {
          setCodeState({
            code: extractedCode.code,
            language: extractedCode.language,
            platform: extractedCode.platform,
          });
          
          // Track code extraction
          track("code_extracted_from_chat", {
            language: extractedCode.language,
            code_length: extractedCode.code.length,
          });
        }
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Error sending message:", error);
      // Show user-friendly error message
      const errorMessage: Message = {
        id: `${Date.now()}-error`,
        role: "agent",
        content: `❌ **Error**: ${error instanceof Error ? error.message : "Unknown error"}\n\n💡 **Troubleshooting**:\n- Check if ANTHROPIC_API_KEY is set in environment variables\n- Verify your API key is valid\n- Check your internet connection\n- Try again in a moment`,
        timestamp: new Date(),
      };
      addMessage(errorMessage);
      setIsLoading(false);
    }
  };

  const getAgentGradient = (agent?: string) => {
    const gradients: Record<string, string> = {
      architect: "from-purple-500 to-pink-500",
      coder: "from-blue-500 to-cyan-500",
      tester: "from-green-500 to-emerald-500",
      deployer: "from-orange-500 to-red-500",
      monitor: "from-indigo-500 to-purple-500",
    };
    return gradients[agent || ""] || "from-gray-500 to-gray-600";
  };

  const getAgentIcon = (agent?: string) => {
    const icons: Record<string, string> = {
      architect: "🏗️",
      coder: "💻",
      tester: "🧪",
      deployer: "🚀",
      monitor: "📊",
    };
    return icons[agent || ""] || "🤖";
  };

  return (
    <div className="h-full flex flex-col bg-gray-900/80 backdrop-blur-xl">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-800 backdrop-blur-sm bg-gray-900/90 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <span className="text-lg sm:text-xl">🤖</span>
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-100">AI Agent Chat</h2>
            <p className="text-xs sm:text-sm text-gray-400">Chat with specialized AI agents</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center max-w-md px-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl sm:text-4xl">💬</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-100 mb-2">No messages yet</h3>
              <p className="text-sm sm:text-base text-gray-300 mb-4">Start by describing your app idea</p>
              <div className="text-xs sm:text-sm text-gray-400 space-y-1">
                <p>💡 Try: "Build a task management app"</p>
                <p>💡 Try: "Create a social media platform"</p>
              </div>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-2 sm:gap-4 ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.role === "agent" && (
              <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br ${getAgentGradient(message.agent)} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                <span className="text-base sm:text-lg">{getAgentIcon(message.agent)}</span>
              </div>
            )}

            <div
              className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-3 sm:px-4 py-2 sm:py-3 backdrop-blur-sm ${
                message.role === "user"
                  ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50"
                  : message.content.includes("❌") || message.content.includes("Error")
                  ? "bg-red-900/30 text-red-200 border border-red-700/50"
                  : "bg-gray-800/80 text-gray-200 border border-gray-700"
              }`}
            >
              {message.agent && (
                <div className="text-xs font-semibold text-purple-300 mb-1 capitalize">
                  {message.agent}
                </div>
              )}
              <div className="text-xs sm:text-sm leading-relaxed break-words whitespace-pre-wrap">
                {message.content.split('\n').map((line, i) => {
                  if (line.startsWith('💡') || line.startsWith('❌')) {
                    return <div key={i} className="mt-1">{line}</div>;
                  }
                  return <div key={i}>{line}</div>;
                })}
              </div>
            </div>

            {message.role === "user" && (
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-base sm:text-lg">👤</span>
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-2 sm:gap-4 justify-start">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center animate-pulse">
              <span className="text-base sm:text-lg">🤖</span>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl px-3 sm:px-4 py-2 sm:py-3 border border-gray-700">
              <div className="flex items-center gap-2">
                <div className="flex space-x-2">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    ></div>
                  ))}
                </div>
                <span className="text-xs sm:text-sm text-gray-400 ml-2">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input - Larger tap target on mobile */}
      <div className="p-4 sm:p-6 border-t border-gray-800 backdrop-blur-sm bg-gray-900/90 flex-shrink-0">
        <div className="flex gap-2 sm:gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
            placeholder="Describe what you want to build..."
            className="flex-1 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl px-4 py-3 min-h-[44px] text-sm sm:text-base text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="px-4 sm:px-6 py-3 min-h-[44px] min-w-[44px] bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed active:shadow-lg active:shadow-purple-500/50 transition-all touch-manipulation flex items-center justify-center"
            aria-label="Send message"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
