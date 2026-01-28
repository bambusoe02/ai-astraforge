"use client";

import { useEffect } from "react";
import { Button } from "@astraforge/ui";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";
import { track } from "@vercel/analytics";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console
    console.error("Error boundary caught:", error);
    
    // Track error to analytics
    track("error_boundary_triggered", {
      error_message: error.message,
      error_digest: error.digest,
      error_stack: error.stack?.substring(0, 200), // First 200 chars
    });
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950/10 to-slate-950 p-6">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-red-400" />
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-100">
            Something went wrong!
          </h2>
          <p className="text-gray-400">
            The AI agents encountered an error. Don't worry, we're on it!
          </p>
          {error.digest && (
            <p className="text-xs text-gray-500 mt-2 font-mono">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={reset}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try again
          </Button>
          <Link href="/">
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              <Home className="w-4 h-4 mr-2" />
              Go home
            </Button>
          </Link>
        </div>

        {/* Help Text */}
        <div className="pt-4 border-t border-gray-800">
          <p className="text-sm text-gray-500">
            If this problem persists, please{" "}
            <a
              href="https://github.com/bambusoe02/ai-astraforge/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              report an issue
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

