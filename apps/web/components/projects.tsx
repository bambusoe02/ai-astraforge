"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, RefreshCw, Check, X, FolderOpen } from "lucide-react";
import { useApp } from "../lib/context/app-context";
import { track } from "@vercel/analytics";

export function Projects() {
  const {
    projects,
    currentProjectId,
    createProject,
    switchProject,
    deleteProject,
    clearCurrentProject,
  } = useApp();

  const [isCreating, setIsCreating] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isClearing, setIsClearing] = useState(false);

  const handleCreateProject = () => {
    if (!newProjectName.trim()) {
      setError("Project name cannot be empty");
      return;
    }

    try {
      const projectId = createProject(newProjectName.trim());
      setNewProjectName("");
      setIsCreating(false);
      setError(null);
      track("project_created", { projectId });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create project");
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    setIsDeleting(projectId);
    try {
      deleteProject(projectId);
      setShowConfirmDelete(null);
      setError(null);
      track("project_deleted", { projectId });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete project");
      setShowConfirmDelete(null);
    } finally {
      setIsDeleting(null);
    }
  };

  const handleClearProject = async () => {
    setIsClearing(true);
    try {
      clearCurrentProject();
      setShowConfirmClear(false);
      setError(null);
      track("project_cleared", { projectId: currentProjectId });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to clear project");
      setShowConfirmClear(false);
    } finally {
      setIsClearing(false);
    }
  };

  const currentProject = projects.find((p) => p.id === currentProjectId);

  return (
    <div className="h-full flex flex-col bg-gray-900/80 backdrop-blur-xl overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-800 backdrop-blur-sm bg-gray-900/90 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-100">Projects</h2>
            <p className="text-xs sm:text-sm text-gray-400">Manage your AI projects</p>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="px-4 py-2 min-h-[44px] bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2 touch-manipulation"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Project</span>
          </button>
        </div>
      </div>

      {/* Error Display */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 bg-red-900/30 border-b border-red-700/50"
          >
            <div className="flex items-center justify-between">
              <p className="text-red-200 text-sm">{error}</p>
              <button
                onClick={() => setError(null)}
                className="text-red-300 hover:text-red-100 transition-colors"
                aria-label="Dismiss error"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Project Form */}
      <AnimatePresence>
        {isCreating && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 sm:p-6 border-b border-gray-800 bg-gray-800/50"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleCreateProject();
                  if (e.key === "Escape") {
                    setIsCreating(false);
                    setNewProjectName("");
                  }
                }}
                placeholder="Project name..."
                className="flex-1 bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                autoFocus
              />
              <button
                onClick={handleCreateProject}
                disabled={!newProjectName.trim()}
                className="px-4 py-2 min-h-[44px] bg-green-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-600 transition-all flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setNewProjectName("");
                }}
                className="px-4 py-2 min-h-[44px] bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all flex items-center gap-2"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Current Project Info */}
      {currentProject && (
        <div className="p-4 sm:p-6 border-b border-gray-800 bg-purple-500/10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FolderOpen className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-semibold text-purple-300">Current Project</span>
              </div>
              <h3 className="text-lg font-bold text-gray-100">{currentProject.name}</h3>
              <p className="text-xs text-gray-400">
                {currentProject.messages.length} messages • Updated {new Date(currentProject.updatedAt).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => setShowConfirmClear(true)}
              className="px-3 py-2 min-h-[44px] bg-gray-800/80 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700/50 transition-all flex items-center gap-2 text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          </div>
        </div>
      )}

      {/* Projects List */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 bg-gray-800/50 rounded-2xl flex items-center justify-center mb-4">
              <FolderOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-100 mb-2">No projects yet</h3>
            <p className="text-sm text-gray-400 mb-4">Create your first project to get started</p>
            <button
              onClick={() => setIsCreating(true)}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              Create Project
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {projects.map((project) => {
              const isActive = project.id === currentProjectId;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl border transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50 shadow-lg shadow-purple-500/20"
                      : "bg-gray-800/50 border-gray-700 hover:bg-gray-800/70"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => switchProject(project.id)}
                      className="flex-1 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <FolderOpen
                          className={`w-5 h-5 ${
                            isActive ? "text-purple-400" : "text-gray-400"
                          }`}
                        />
                        <div>
                          <h4 className={`font-semibold ${
                            isActive ? "text-purple-200" : "text-gray-100"
                          }`}>
                            {project.name}
                          </h4>
                          <p className="text-xs text-gray-400">
                            {project.messages.length} messages • {new Date(project.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </button>
                    <div className="flex items-center gap-2">
                      {isActive && (
                        <span className="px-2 py-1 bg-purple-500/30 text-purple-200 rounded text-xs font-medium">
                          Active
                        </span>
                      )}
                      <button
                        onClick={() => setShowConfirmDelete(project.id)}
                        className="p-2 min-w-[44px] min-h-[44px] text-red-400 hover:bg-red-500/20 rounded-lg transition-all"
                        title="Delete project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Confirm Clear Dialog */}
      <AnimatePresence>
        {showConfirmClear && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowConfirmClear(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-gray-100 mb-2">Clear Current Project?</h3>
              <p className="text-sm text-gray-400 mb-4">
                This will clear all messages and code in the current project. This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleClearProject}
                  disabled={isClearing}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isClearing ? "Clearing..." : "Clear"}
                </button>
                <button
                  onClick={() => setShowConfirmClear(false)}
                  className="flex-1 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirm Delete Dialog */}
      <AnimatePresence>
        {showConfirmDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowConfirmDelete(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-gray-100 mb-2">Delete Project?</h3>
              <p className="text-sm text-gray-400 mb-4">
                This will permanently delete the project and all its data. This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleDeleteProject(showConfirmDelete)}
                  disabled={isDeleting === showConfirmDelete}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeleting === showConfirmDelete ? "Deleting..." : "Delete"}
                </button>
                <button
                  onClick={() => setShowConfirmDelete(null)}
                  className="flex-1 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


