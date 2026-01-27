# 🚀 AstraForge Production Deployment Guide

## Prerequisites

- Node.js 18+
- Python 3.11+
- PostgreSQL 15+
- Redis 7+
- Docker & Docker Compose (optional)

## Pre-Deployment Checklist

### ✅ Security

- [ ] All environment variables configured
- [ ] API keys rotated and secured
- [ ] Database credentials changed from defaults
- [ ] HTTPS/SSL certificates configured
- [ ] CORS origins restricted to production domains
- [ ] Rate limiting enabled
- [ ] Security headers configured

### ✅ Performance

- [ ] Database indexes created
- [ ] Redis caching configured
- [ ] CDN configured for static assets
- [ ] Image optimization enabled
- [ ] Compression enabled
- [ ] Monitoring and alerting set up

### ✅ Reliability

- [ ] Health checks configured
- [ ] Auto-scaling rules set
- [ ] Backup strategy implemented
- [ ] Disaster recovery plan documented
- [ ] Logging and monitoring active

## Deployment Steps

### 1. Environment Setup

```bash
# Copy production environment file
cp env.production.example .env.production

# Edit with production values
nano .env.production
```

### 2. Database Migration

```bash
# Run migrations
cd apps/api
alembic upgrade head
```

### 3. Build Application

```bash
# Build all packages
npm run build

# Verify builds
npm run typecheck
npm run lint
```

### 4. Docker Deployment (Recommended)

```bash
# Build and start services
docker-compose -f docker-compose.prod.yml up -d

# Check health
curl http://localhost:8000/health/detailed
```

### 5. Platform-Specific Deployment

#### Vercel (Frontend)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Railway (Backend)

```bash
# Install Railway CLI
npm i -g @railway/cli

# Deploy
railway up
```

## Monitoring

### Health Endpoints

- `/health` - Basic health check
- `/health/detailed` - Comprehensive system status
- `/health/readiness` - Kubernetes readiness probe
- `/health/liveness` - Kubernetes liveness probe

### Metrics to Monitor

- API response times
- Error rates
- Database connection pool
- Redis cache hit rate
- AI agent response times
- System resource usage

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check DATABASE_URL format
   - Verify network connectivity
   - Check firewall rules

2. **Redis Connection Failed**
   - Verify REDIS_URL
   - Check Redis service status
   - Review connection limits

3. **AI Service Errors**
   - Verify OPENAI_API_KEY
   - Check API rate limits
   - Review quota usage

## Rollback Procedure

```bash
# Stop current deployment
docker-compose down

# Restore previous version
git checkout <previous-commit>
npm run build
docker-compose up -d
```

## Post-Deployment

- [ ] Verify all endpoints responding
- [ ] Test critical user flows
- [ ] Monitor error logs
- [ ] Check performance metrics
- [ ] Verify backups running
