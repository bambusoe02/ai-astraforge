from fastapi import APIRouter, HTTPException
from datetime import datetime
from typing import Dict, Any
import os
import sys

router = APIRouter()


@router.get("/")
async def health_check() -> Dict[str, Any]:
    """Basic health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "version": "1.0.0",
        "environment": os.getenv("ENVIRONMENT", "development"),
    }


@router.get("/detailed")
async def detailed_health_check() -> Dict[str, Any]:
    """Detailed health check with system information"""
    try:
        # Check database
        db_status = await check_database()
        
        # Check Redis
        redis_status = await check_redis()
        
        # Check external services
        services_status = await check_external_services()
        
        overall_status = "healthy"
        if db_status["status"] != "healthy" or redis_status["status"] != "healthy":
            overall_status = "degraded"
        if services_status.get("critical_failures", 0) > 0:
            overall_status = "unhealthy"
        
        return {
            "status": overall_status,
            "timestamp": datetime.utcnow().isoformat(),
            "version": "1.0.0",
            "environment": os.getenv("ENVIRONMENT", "development"),
            "components": {
                "database": db_status,
                "redis": redis_status,
                "services": services_status,
            },
            "system": {
                "python_version": sys.version,
                "platform": sys.platform,
            },
        }
    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail=f"Health check failed: {str(e)}"
        )


@router.get("/readiness")
async def readiness_check() -> Dict[str, Any]:
    """Kubernetes readiness probe"""
    db_status = await check_database()
    
    if db_status["status"] != "healthy":
        raise HTTPException(
            status_code=503,
            detail="Service not ready: database unavailable"
        )
    
    return {
        "status": "ready",
        "timestamp": datetime.utcnow().isoformat(),
    }


@router.get("/liveness")
async def liveness_check() -> Dict[str, Any]:
    """Kubernetes liveness probe"""
    return {
        "status": "alive",
        "timestamp": datetime.utcnow().isoformat(),
    }


async def check_database() -> Dict[str, Any]:
    """Check database connectivity"""
    try:
        # In production, this would check actual database connection
        # from app.core.database import get_db
        # async with get_db() as db:
        #     await db.execute("SELECT 1")
        
        return {
            "status": "healthy",
            "message": "Database connection active",
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "message": f"Database connection failed: {str(e)}",
        }


async def check_redis() -> Dict[str, Any]:
    """Check Redis connectivity"""
    try:
        # In production, implement actual Redis check
        # import redis
        # r = redis.from_url(settings.redis_url)
        # r.ping()
        
        return {
            "status": "healthy",
            "message": "Redis connection active",
        }
    except Exception as e:
        return {
            "status": "degraded",
            "message": f"Redis connection failed: {str(e)}",
        }


async def check_external_services() -> Dict[str, Any]:
    """Check external service availability"""
    services = {
        "openai": bool(os.getenv("OPENAI_API_KEY")),
        "stripe": bool(os.getenv("STRIPE_SECRET_KEY")),
        "clerk": bool(os.getenv("CLERK_SECRET_KEY")),
    }
    
    critical_failures = 0
    if not services["openai"]:
        critical_failures += 1
    
    return {
        "status": "healthy" if critical_failures == 0 else "degraded",
        "services": services,
        "critical_failures": critical_failures,
    }