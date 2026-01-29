# Production Setup Guide

## Overview

AstraForge has been converted from demo mode to production with real Claude API integration. All mock data has been replaced with actual API calls to Anthropic's Claude Sonnet 4.

## Required Environment Variables

### 1. ANTHROPIC_API_KEY (REQUIRED)

**Get your API key:**
1. Visit https://console.anthropic.com/
2. Sign up or log in
3. Navigate to API Keys
4. Create a new API key
5. Copy the key (starts with `sk-ant-`)

**Set in your environment:**
```bash
# Local development (.env.local)
ANTHROPIC_API_KEY=sk-ant-your-key-here

# Vercel (Production)
# Add in Vercel Dashboard → Settings → Environment Variables
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

## API Routes

The following API routes have been created in `app/api/`:

### `/api/chat`
- **Method:** POST
- **Purpose:** Chat with AI agents using Claude
- **Rate Limit:** 20 requests/minute per IP
- **Body:**
  ```json
  {
    "message": "Build a task management app",
    "agentType": "coder" // optional: architect, coder, tester, deployer, monitor
  }
  ```

### `/api/generate-code`
- **Method:** POST
- **Purpose:** Generate code for specific platforms
- **Rate Limit:** 10 requests/minute per IP
- **Body:**
  ```json
  {
    "platform": "nextjs", // or "fastapi", "mobile"
    "prompt": "Create a login form" // optional
  }
  ```

### `/api/agent-status`
- **Method:** GET
- **Purpose:** Get current status of AI agents
- **Rate Limit:** None (read-only)

## Features

### ✅ What's Working

1. **Real Claude API Integration**
   - All chat messages use Claude Sonnet 4
   - Code generation uses Claude
   - Agent-specific prompts for different roles

2. **Rate Limiting**
   - In-memory rate limiting (use Redis in production)
   - Prevents API abuse
   - Returns 429 status on limit exceeded

3. **Error Handling**
   - Graceful error messages
   - User-friendly error display
   - Proper error logging

4. **Agent Types**
   - Architect: System design
   - Coder: Code generation
   - Tester: QA and testing
   - Deployer: CI/CD guidance
   - Monitor: System health

### 🔄 Migration from Mock Data

All components have been updated:
- `components/agent-chat.tsx` → Uses `/api/chat`
- `components/code-editor.tsx` → Uses `/api/generate-code`
- `components/agent-status.tsx` → Uses `/api/agent-status`
- `components/project-status.tsx` → Uses real API client

The old `lib/mock-data.ts` is still present but no longer used.

## Production Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Add Environment Variable**
   - Go to Settings → Environment Variables
   - Add `ANTHROPIC_API_KEY` with your key
   - Deploy

### Railway / Other Platforms

1. Set `ANTHROPIC_API_KEY` in your environment
2. Ensure Node.js 18+ is available
3. Build command: `npm run build`
4. Start command: `npm start`

## Rate Limiting (Production)

The current implementation uses in-memory rate limiting. For production at scale, consider:

1. **Redis-based rate limiting**
   ```typescript
   import { Redis } from 'ioredis';
   const redis = new Redis(process.env.REDIS_URL);
   ```

2. **Vercel Edge Config** (if using Vercel)

3. **Upstash Redis** (serverless Redis)

## Monitoring

- **Vercel Analytics**: Already integrated
- **Error Tracking**: Check Vercel logs
- **API Usage**: Monitor Anthropic dashboard

## Troubleshooting

### "API key not configured"
- Ensure `ANTHROPIC_API_KEY` is set in environment
- Restart dev server after adding env var
- Check Vercel environment variables

### "Rate limit exceeded"
- Wait 1 minute between requests
- Consider upgrading rate limits for production

### "Anthropic API error"
- Check API key validity
- Verify account has credits
- Check Anthropic status page

## Cost Estimation

Claude Sonnet 4 pricing (as of 2025):
- Input: ~$3 per 1M tokens
- Output: ~$15 per 1M tokens

Typical usage:
- Chat message: ~500-2000 tokens
- Code generation: ~1000-5000 tokens

**Estimated cost per 1000 requests:** ~$0.50 - $2.00

## Next Steps

1. ✅ Set `ANTHROPIC_API_KEY` environment variable
2. ✅ Test chat functionality
3. ✅ Test code generation
4. 🔄 Consider adding streaming responses
5. 🔄 Add Redis for rate limiting
6. 🔄 Add conversation history storage
7. 🔄 Add user authentication

---

**Questions?** Open an issue or contact: bambusoe@gmail.com

