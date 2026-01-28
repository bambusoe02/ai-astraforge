# Contributing to AstraForge

Thanks for your interest in contributing to **AstraForge**! 🚀  
We welcome bug reports, feature requests, docs improvements, and PRs.

## Development Setup

```bash
# Clone the repository
git clone https://github.com/bambusoe02/ai-astraforge.git
cd ai-astraforge

# Install dependencies
npm install

# Start development servers (Turborepo)
npm run dev
```

## Project Structure

```text
ai-astraforge/
├── apps/
│   ├── web/          # Next.js dashboard + landing page
│   ├── api/          # FastAPI backend
│   ├── mobile/       # React Native (Expo)
│   └── extension/    # Chrome Extension
├── packages/
│   ├── ui/           # Shared UI components (@astraforge/ui)
│   ├── ai-agents/    # AI agent orchestration (@astraforge/ai-agents)
│   ├── tsconfig/     # Shared TS configs
│   └── eslint-config/# Shared ESLint config
└── docs/             # Documentation (optional)
```

## Environment Variables

We keep example env files in the repo root:

- `env.local.example` → copy to `.env.local` for local dev
- `env.production.example` → reference for production
- `env.example` → general template

```bash
cp env.local.example .env.local
```

## Making Changes

1. **Fork** the repository
2. **Create** a feature branch:

```bash
git checkout -b feature/amazing-feature
```

3. **Commit** your changes (see Conventional Commits below)
4. **Push** your branch:

```bash
git push origin feature/amazing-feature
```

5. **Open** a Pull Request

## Code Style

- **TypeScript**: prefer strict, typed code; avoid `any`
- **Formatting**: Prettier
- **Linting**: ESLint via workspace config
- **Commits**: Conventional Commits (recommended)

Examples:

- `feat(web): add screenshots gallery lightbox`
- `fix(api): handle missing DATABASE_URL`
- `chore: update docs`

## Pull Request Guidelines

- ✅ Keep PRs focused and small
- ✅ Describe **what** and **why** (not just how)
- ✅ Update docs when behavior changes
- ✅ Avoid introducing secrets in commits
- ✅ Add tests when feasible (or clearly explain why not)
- ✅ Link related issues (if any)

## Useful Commands

```bash
npm run dev          # Start dev for all workspaces
npm run build        # Build (web-only filter is used in CI/Vercel)
npm run build:web    # Build only @astraforge/web
npm run test         # Run tests (if configured)
npm run lint         # Lint all workspaces
npm run format       # Format with Prettier
npm run typecheck    # Typecheck all workspaces
```

## Questions?

Open an issue or contact:

- **Email**: `bambusoe@gmail.com`
- **GitHub**: [@bambusoe02](https://github.com/bambusoe02)

## License

By contributing, you agree that your contributions will be licensed under the **MIT License**.

---

Built by the AstraForge community.


