"use client";

import { useState, useRef, useEffect } from "react";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@astraforge/ui";
import { Send, Bot, User, Code, TestTube, Rocket, Monitor } from "lucide-react";

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
        return <Code className="w-4 h-4" />;
      case "coder":
        return <Bot className="w-4 h-4" />;
      case "tester":
        return <TestTube className="w-4 h-4" />;
      case "deployer":
        return <Rocket className="w-4 h-4" />;
      case "monitor":
        return <Monitor className="w-4 h-4" />;
      default:
        return <Bot className="w-4 h-4" />;
    }
  };

  return (
    <Card className="h-full bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Bot className="w-5 h-5" />
          AI Agent Chat
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col h-[calc(100%-5rem)]">
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
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4" />
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
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Describe what you want to build..."
            className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <Button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
