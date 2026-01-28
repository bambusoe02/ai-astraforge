"use client";

import { MessageSquare, Code, BarChart3 } from "lucide-react";

interface EmptyStateProps {
  type: "chat" | "editor" | "status";
  title: string;
  description: string;
}

const icons = {
  chat: MessageSquare,
  editor: Code,
  status: BarChart3,
};

export function EmptyState({ type, title, description }: EmptyStateProps) {
  const Icon = icons[type];

  return (
    <div className="h-full flex items-center justify-center p-12">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Icon className="w-10 h-10 text-purple-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-slate-400">{description}</p>
      </div>
    </div>
  );
}

