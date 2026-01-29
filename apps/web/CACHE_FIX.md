# How to Fix Next.js Cache Issues

## Problem: You See Old Version After Update

Next.js caches components, images, and builds. If you see an old version, follow these steps:

## Local Solution

### 1. Clear Next.js Cache
```bash
cd apps/web
npm run clean
# or manually:
rm -rf .next .turbo node_modules/.cache
```

### 2. Run Dev Server with Clean Cache
```bash
npm run dev:clean
```

### 3. Clear Browser Cache
- **Chrome/Edge**: `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
- Select "Cached images and files"
- Click "Clear data"

### 4. Hard Refresh in Browser
- **Windows/Linux**: `Ctrl + F5` or `Ctrl + Shift + R`
- **Mac**: `Cmd + Shift + R`

## Solution for Vercel (Production)

### 1. Clear Vercel Build Cache
1. Go to Vercel Dashboard
2. Project Settings → General
3. Scroll to "Build & Development Settings"
4. Click "Clear Build Cache"
5. Redeploy project

### 2. Force Redeploy
```bash
git commit --allow-empty -m "Force redeploy"
git push
```

### 3. Check if Images Updated
- Open DevTools (F12)
- Network tab
- Refresh page with `Disable cache` checked
- Check if images have new timestamps

## Debugging

### Check if Files Are Updated
```bash
# Check screenshot modification dates
ls -la apps/web/public/screenshots/

# Check if components are updated
grep -r "placeholder" apps/web/components/
```

### Check Next.js Cache
```bash
# See what's in cache
ls -la apps/web/.next/cache/
```

### Check if Build Uses New Files
```bash
cd apps/web
npm run build
# Check output - should show new files
```

## Most Common Causes

1. **Browser cache** - Most common cause
2. **Next.js .next folder** - Old build
3. **Vercel cache** - Old deployment
4. **CDN cache** - If using CDN
5. **Service Worker** - If you have PWA

## Automatic Cleanup

Already added to `.gitignore`:
```
.next/
.turbo/
node_modules/.cache/
```

## Verify It Works

After clearing cache:
1. Open DevTools → Network
2. Refresh page
3. Check if images have new timestamps
4. Check if components are updated

---

**Tip**: If you still see old version, use incognito/private mode in browser.
