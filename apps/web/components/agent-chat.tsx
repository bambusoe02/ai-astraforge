"use client";

import React, { useState, useRef, useEffect } from "react";
// Temporarily using basic HTML elements for deployment
// import { Button, Card, CardContent, CardHeader, CardTitle } from "@astraforge/ui";
// import { Send, Bot, User, Code, TestTube, Rocket, Monitor } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "agent";
  content: string;
  agent?: "architect" | "coder" | "tester" | "deployer" | "monitor";
  timestamp: Date;
}

export function AgentChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Temporarily disabled scrolling for deployment
  // const scrollToBottom = () => {
  //   if (messagesEndRef.current) {
  //     messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  //   }
  // };

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate agent responses
    setTimeout(() => {
      const agents = ["architect", "coder", "tester", "deployer", "monitor"] as const;
      const agentMessages = [
        "Designing system architecture...",
        "Generating code across platforms...",
        "Running comprehensive tests...",
        "Deploying to production...",
        "Monitoring system health...",
      ];

      agents.forEach((agent, index) => {
        setTimeout(() => {
          const agentMessage: Message = {
            id: `${Date.now()}-${agent}`,
            role: "agent",
            content: agentMessages[index],
            agent,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, agentMessage]);
        }, (index + 1) * 1000);
      });

      setIsLoading(false);
    }, 1000);
  };

  const getAgentIcon = (agent?: string) => {
    switch (agent) {
      case "architect":
        return "🏗️";
      case "coder":
        return "💻";
      case "tester":
        return "🧪";
      case "deployer":
        return "🚀";
      case "monitor":
        return "📊";
      default:
        return "🤖";
    }
  };

  return (
    <div className="h-full bg-slate-800 border border-slate-700 rounded-lg">
      <div className="p-6 border-b border-slate-700">
        <h2 className="flex items-center gap-2 text-white text-xl font-semibold">
          🤖 AI Agent Chat
        </h2>
      </div>
      <div className="flex flex-col h-[calc(100%-5rem)] p-6">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "agent" && (
                <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  {getAgentIcon(message.agent)}
                </div>
              )}
              <div
                className={`max-w-[70%] rounded-lg px-4 py-2 ${
                  message.role === "user"
                    ? "bg-purple-600 text-white"
                    : "bg-slate-700 text-slate-200"
                }`}
              >
                {message.agent && (
                  <div className="text-xs text-purple-300 mb-1 capitalize">
                    {message.agent}
                  </div>
                )}
                {message.content}
              </div>
              {message.role === "user" && (
                <div className="flex-shrink-0 w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
                  👤
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                🤖
              </div>
              <div className="bg-slate-700 text-slate-200 rounded-lg px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput((e.target as HTMLInputElement).value)}
            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && sendMessage()}
            placeholder="Describe what you want to build..."
            className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-white disabled:opacity-50"
          >
            📤
          </button>
        </div>
      </div>
    </div>
  );
}
