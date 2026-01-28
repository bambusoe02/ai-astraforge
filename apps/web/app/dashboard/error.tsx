"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";
import { track } from "@vercel/analytics";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error boundary caught:", error);
    
    track("dashboard_error", {
      error_message: error.message,
      error_digest: error.digest,
    });
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950/10 to-slate-950 p-6">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-yellow-400" />
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-100">
            Dashboard Error
          </h2>
          <p className="text-gray-400">
            Something went wrong in the dashboard. The AI agents might be having a moment.
          </p>
          {error.digest && (
            <p className="text-xs text-gray-500 mt-2 font-mono">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 border border-gray-700 text-gray-300 rounded-lg font-semibold hover:bg-gray-800 transition-all flex items-center justify-center"
          >
            <Home className="w-4 h-4 mr-2" />
            Go home
          </Link>
        </div>

        {/* Help Text */}
        <div className="pt-4 border-t border-gray-800">
          <p className="text-sm text-gray-500">
            This is a demo mode. Full error handling will be available in production.
          </p>
        </div>
      </div>
    </div>
  );
}

