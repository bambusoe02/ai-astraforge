# 🚀 Vercel Deployment Guide for AstraForge

## Quick Deploy

### Option 1: Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project root
cd /home/bambusoe/ai-astraforge
vercel

# Follow prompts:
# - Link to existing project? No (first time) / Yes (updates)
# - Project name: astraforge
# - Directory: ./apps/web
# - Override settings? No
```

### Option 2: GitHub Integration (Automatic)

1. **Push to GitHub** (if not already):
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository: `bambusoe02/ai-astraforage`
   - Configure:
     - **Framework Preset:** Next.js
     - **Root Directory:** `apps/web`
     - **Build Command:** `cd ../.. && npm install && npm run build --filter=web`
     - **Output Directory:** `.next`
     - **Install Command:** `npm install`

3. **Environment Variables** (Add in Vercel Dashboard):
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   DATABASE_URL=postgresql://...
   OPENAI_API_KEY=sk-...
   NODE_ENV=production
   ```

## Configuration Files

### vercel.json (Root)
```json
{
  "buildCommand": "cd ../.. && npm install && npm run build --filter=web",
  "outputDirectory": "apps/web/.next",
  "framework": "nextjs",
  "installCommand": "npm install",
  "devCommand": "cd ../.. && npm run dev --filter=web",
  "regions": ["iad1"]
}
```

### Project Settings in Vercel Dashboard

**General:**
- Framework: Next.js
- Root Directory: `apps/web`
- Build Command: `cd ../.. && npm install && npm run build --filter=web`
- Output Directory: `.next`
- Install Command: `npm install`

**Environment Variables:**
- Add all variables from `env.example`
- Mark sensitive ones as "Encrypted"

## Monorepo Setup

Since this is a Turborepo monorepo, Vercel needs to:

1. **Install all dependencies** (root + workspaces)
2. **Build only the web app** using Turbo filter
3. **Output from apps/web/.next**

### Build Process

```bash
# Vercel will run:
npm install                    # Installs root + all workspaces
npm run build --filter=web    # Builds only web app via Turbo
```

## Troubleshooting

### Issue: Build fails with "Cannot find module"

**Solution:** Ensure all workspace dependencies are installed:
```json
// package.json
{
  "workspaces": ["apps/*", "packages/*"]
}
```

### Issue: Turbo not found

**Solution:** Add turbo to root dependencies:
```bash
npm install turbo --save-dev
```

### Issue: Workspace packages not found

**Solution:** Ensure packages are built before web:
```json
// turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"]
    }
  }
}
```

## Production Deployment

### Pre-deployment Checklist

- [ ] All environment variables set in Vercel
- [ ] Build passes locally: `npm run build --filter=web`
- [ ] TypeScript compiles: `npm run typecheck`
- [ ] Linting passes: `npm run lint`
- [ ] No console errors in browser

### Deploy Commands

```bash
# Production deploy
vercel --prod

# Preview deploy
vercel

# Check deployment status
vercel ls
```

## Custom Domain

1. Go to Vercel Dashboard → Project → Settings → Domains
2. Add your domain
3. Update DNS records as instructed
4. SSL certificate auto-provisioned

## Monitoring

- **Analytics:** Already integrated via `@vercel/analytics`
- **Logs:** Available in Vercel Dashboard
- **Performance:** Check Vercel Analytics dashboard

## Next Steps

1. ✅ Deploy web app to Vercel
2. ⏳ Deploy API to Railway/Render (separate service)
3. ⏳ Set up database (Neon PostgreSQL)
4. ⏳ Configure environment variables
5. ⏳ Test production deployment

## Support

- [Vercel Docs](https://vercel.com/docs)
- [Turborepo + Vercel](https://turbo.build/repo/docs/handbook/deploying-to-vercel)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
