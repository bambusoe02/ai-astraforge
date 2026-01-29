# Local Development - How It Works

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set environment variables
cp ../../env.example .env.local
# Edit .env.local and add ANTHROPIC_API_KEY

# 3. Run dev server
npm run dev
```

## How It Works Locally

### 1. Next.js Dev Server
- **Port**: `http://localhost:3000`
- **Hot Reload**: Automatically refreshes on changes
- **Fast Refresh**: React components refresh without losing state

### 2. Next.js Cache
Next.js caches:
- **Components** in `.next/cache/`
- **Images** in `.next/cache/images/`
- **Build artifacts** in `.next/`

### 3. Cache Problem

If you see an old version:

```bash
# Quick solution
npm run clean && npm run dev

# Or manually
rm -rf .next .turbo node_modules/.cache
npm run dev
```

### 4. Browser Cache

Browser also caches:
- **Hard Refresh**: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- **DevTools**: Network tab → "Disable cache"
- **Incognito**: Open in private mode

## Project Structure

```
apps/web/
├── app/              # Next.js 14 App Router
│   ├── api/          # API routes (server-side)
│   ├── dashboard/    # Dashboard pages
│   └── page.tsx      # Landing page
├── components/       # React components
├── lib/              # Utilities and API client
├── public/           # Static files (images, etc.)
└── .next/            # Build output (ignored in git)
```

## API Routes (Server-side)

API routes run on server:
- `/api/chat` - Chat with Claude
- `/api/generate-code` - Code generation
- `/api/agent-status` - Agent status

**Important**: API routes require `ANTHROPIC_API_KEY` in `.env.local`

## Environment Variables

```bash
# .env.local (don't commit!)
ANTHROPIC_API_KEY=sk-ant-your-key-here
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Debugging

### Check if Changes Loaded
```bash
# 1. Check if file was modified
ls -la apps/web/components/your-component.tsx

# 2. Check if Next.js sees changes
# In terminal where `npm run dev` is running, you should see:
# "compiled /your-page successfully"
```

### Check Cache
```bash
# See what's in cache
ls -la apps/web/.next/cache/

# Clear cache
npm run clean
```

### Check Build
```bash
# Build production version
npm run build

# Run production server
npm start
```

## Common Problems

### 1. "Module not found"
```bash
# Clear and reinstall
rm -rf node_modules .next
npm install
```

### 2. "Port 3000 already in use"
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
# Or use different port
PORT=3001 npm run dev
```

### 3. "API key not configured"
```bash
# Check if .env.local exists
cat .env.local

# Check if variable is set
echo $ANTHROPIC_API_KEY
```

### 4. Old Version After Update
```bash
# See CACHE_FIX.md
npm run clean
npm run dev
# Hard refresh in browser (Ctrl+Shift+R)
```

## Tips

1. **Use DevTools**: F12 → Network tab → "Disable cache"
2. **Hot Reload**: Component changes refresh automatically
3. **TypeScript**: Errors show in terminal and browser
4. **Console**: Check console in DevTools for errors

## Production Build

```bash
# Build production version
npm run build

# Run production server
npm start
```

Production version is optimized and cached.

---

**Questions?** See `CACHE_FIX.md` for cache details.
