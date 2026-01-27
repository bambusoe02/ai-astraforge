"use client";

import React, { useState, useEffect } from "react";

interface HealthStatus {
  overall: "healthy" | "degraded" | "unhealthy";
  checks: Array<{
    component: string;
    status: "healthy" | "degraded" | "unhealthy";
    message: string;
    timestamp: string;
  }>;
  fixes: Array<{
    issue: string;
    fix: string;
    applied: boolean;
    timestamp: string;
  }>;
}

export function HealthMonitor() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    fetchHealth();
    
    if (autoRefresh) {
      const interval = setInterval(fetchHealth, 30000); // Every 30 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const fetchHealth = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${apiUrl}/health/detailed`);
      
      if (response.ok) {
        const data = await response.json();
        setHealth({
          overall: data.status,
          checks: Object.entries(data.components || {}).map(([key, value]: [string, any]) => ({
            component: key,
            status: value.status || "unknown",
            message: value.message || "",
            timestamp: new Date().toISOString(),
          })),
          fixes: [],
        });
      }
    } catch (error) {
      console.error("Health check failed:", error);
      setHealth({
        overall: "unhealthy",
        checks: [{
          component: "API",
          status: "unhealthy",
          message: "Failed to connect to health endpoint",
          timestamp: new Date().toISOString(),
        }],
        fixes: [],
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-600";
      case "degraded":
        return "bg-yellow-600";
      case "unhealthy":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return "✅";
      case "degraded":
        return "⚠️";
      case "unhealthy":
        return "❌";
      default:
        return "❓";
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-white">Loading health status...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">System Health Monitor</h2>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="rounded"
            />
            Auto-refresh
          </label>
          <button
            onClick={fetchHealth}
            className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm text-white"
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Overall Status */}
      <div className={`p-4 rounded-lg ${getStatusColor(health?.overall || "unknown")}`}>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{getStatusIcon(health?.overall || "unknown")}</span>
          <div>
            <div className="text-white font-semibold">
              Overall Status: {health?.overall?.toUpperCase() || "UNKNOWN"}
            </div>
            <div className="text-sm text-white/80">
              Last checked: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>

      {/* Component Status */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-slate-300">Components</h3>
        {health?.checks.map((check) => (
          <div
            key={check.component}
            className="flex items-center justify-between p-3 bg-slate-700 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{getStatusIcon(check.status)}</span>
              <div>
                <div className="text-white font-medium">{check.component}</div>
                <div className="text-sm text-slate-400">{check.message}</div>
              </div>
            </div>
            <div className={`px-2 py-1 rounded text-xs text-white ${getStatusColor(check.status)}`}>
              {check.status}
            </div>
          </div>
        ))}
      </div>

      {/* Auto-fixes */}
      {health?.fixes && health.fixes.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-slate-300">Auto-Fixes Applied</h3>
          {health.fixes.map((fix, index) => (
            <div
              key={index}
              className="p-3 bg-slate-700 rounded-lg border-l-4 border-green-500"
            >
              <div className="text-white font-medium">🔧 {fix.issue}</div>
              <div className="text-sm text-slate-400 mt-1">{fix.fix}</div>
              <div className="text-xs text-slate-500 mt-1">
                {fix.applied ? "✅ Applied" : "⏳ Pending"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
