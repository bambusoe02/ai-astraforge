"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console
    console.error("Global error boundary caught:", error);
  }, [error]);

  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950/10 to-slate-950 p-6">
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
              Critical Error
            </h2>
            <p className="text-gray-400">
              A critical error occurred. Please refresh the page.
            </p>
            {error.digest && (
              <p className="text-xs text-gray-500 mt-2 font-mono">
                Error ID: {error.digest}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 justify-center">
            <button
              onClick={reset}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh page
            </button>
            <button
              onClick={() => window.location.href = "/"}
              className="px-6 py-3 border border-gray-700 text-gray-300 rounded-lg font-semibold hover:bg-gray-800 transition-all"
            >
              Go to homepage
            </button>
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
      </body>
    </html>
  );
}

