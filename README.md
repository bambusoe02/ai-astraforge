<div align="center">

# 🌌 AstraForge: AI-Powered Monorepo Factory

*AI factory used by 100+ startups - Build full-stack apps across platforms in minutes*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js 14](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-green)](https://fastapi.tiangolo.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)](https://www.typescriptlang.org/)
[![Turborepo](https://img.shields.io/badge/Turborepo-2.0-purple)](https://turbo.build/)

[🌐 Live Demo](https://ai-astraforge.vercel.app) • [📚 Documentation](#) • [💬 Discord](#)

</div>

---

## ✨ What is AstraForge?

**AstraForge** is the world's first AI-powered monorepo factory that generates production-ready applications across **4 platforms simultaneously** using natural language. Describe what you want to build, and our specialized AI agents handle everything from architecture design to deployment.

### 🎨 Modern UI (2026 Design Trends)

- **Glassmorphism**: Modern frosted glass effects with backdrop blur
- **Minimal Dark UI**: Clean, high-contrast design optimized for readability
- **Micro-interactions**: Smooth animations and transitions
- **Card-based Layout**: Clean, organized interface
- **Dark Mode First**: Optimized for dark theme with perfect contrast

### 🏗️ Architecture Overview

```
monorepo/
├── apps/
│   ├── web/          # Next.js 14 dashboard with modern UI
│   ├── api/          # FastAPI backend (ready for production)
│   ├── mobile/       # React Native + Expo
│   └── extension/    # Chrome Extension
├── packages/
│   ├── ai-agents/    # AI agent orchestration
│   ├── ui/           # Shared UI components
│   └── tsconfig/     # Shared TS configs (and eslint-config/)
```

### 🤖 AI Agents

| Agent | Role | Status |
|-------|------|--------|
| **Architect** 🏗️ | System design & planning | ✅ Active |
| **Coder** 💻 | Cross-platform codegen | ✅ Active |
| **Tester** 🧪 | QA & automated testing | ✅ Active |
| **Deployer** 🚀 | CI/CD & deployment | ✅ Active |
| **Monitor** 📊 | Health monitoring | ✅ Active |
| **Security** 🔒 | Security analysis | ✅ Active |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm 9+
- Python 3.11+ (for API)
- PostgreSQL (or Neon for production)

### Installation

```bash
# Clone repository
git clone https://github.com/bambusoe02/ai-astraforge.git
cd ai-astraforge

# Install dependencies
npm install

# Setup environment
cp env.local.example .env.local
# Edit .env.local with your API keys (Anthropic recommended for demo)

# Start development
npm run dev
```

### Environment Variables

See `env.local.example` for all required variables:

- `ANTHROPIC_API_KEY` - Recommended for AI agents (demo)
- `DATABASE_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_API_URL` - API endpoint (default: http://localhost:8000)

---

## 📦 Project Structure

### Apps

- **web**: Next.js 14 dashboard with modern UI
- **api**: FastAPI backend with AI agent integration
- **mobile**: React Native app (Expo)
- **extension**: Chrome extension

### Packages

- **ai-agents**: AI agent orchestration and management
- **ui**: Shared UI components (shadcn/ui based)
- **shared**: Common utilities and types

---

## 🎯 Features

### Core Capabilities

- ✅ **Natural Language → Code**: Describe your app, get working code
- ✅ **Cross-Platform Sync**: Changes sync across all platforms
- ✅ **Real-time Chat**: Chat with AI agents in real-time
- ✅ **Code Editor**: Monaco editor with syntax highlighting
- ✅ **Project Status**: Monitor builds and deployments

### Production Ready

- ✅ **Vercel Deployment**: Web app deployed and live
- ✅ **Mock API**: Demo mode with realistic delays
- ✅ **TypeScript**: Full type safety
- ✅ **Modern UI**: 2026 design trends

---

## 🔧 Development

```bash
# Run all apps
npm run dev

# Run specific app
npm run dev --filter=web
npm run dev --filter=api

# Build
npm run build

# Lint
npm run lint
```

---

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details

---

## 👤 Author

**Marcin Baran**
- Email: bambusoe@gmail.com
- GitHub: [@bambusoe02](https://github.com/bambusoe02)

---

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Turborepo](https://turbo.build/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
