from pydantic_settings import BaseSettings
from typing import Optional
import os
from pathlib import Path


class Settings(BaseSettings):
    # App settings
    app_name: str = "AstraForge API"
    debug: bool = True
    version: str = "1.0.0"
    environment: str = os.getenv("ENVIRONMENT", "development")

    # Server configuration
    host: str = os.getenv("HOST", "0.0.0.0")
    port: int = int(os.getenv("PORT", "8000"))
    
    # Database
    database_url: str = os.getenv(
        "DATABASE_URL",
        "postgresql://user:password@localhost/astraforge"
    )

    # Redis
    redis_url: str = os.getenv("REDIS_URL", "redis://localhost:6379")

    # External APIs
    openai_api_key: Optional[str] = os.getenv("OPENAI_API_KEY")
    stripe_secret_key: Optional[str] = os.getenv("STRIPE_SECRET_KEY")
    stripe_publishable_key: Optional[str] = os.getenv("STRIPE_PUBLISHABLE_KEY")
    clerk_secret_key: Optional[str] = os.getenv("CLERK_SECRET_KEY")

    # GitHub App
    github_app_id: Optional[str] = os.getenv("GITHUB_APP_ID")
    github_private_key: Optional[str] = os.getenv("GITHUB_PRIVATE_KEY")
    github_webhook_secret: Optional[str] = os.getenv("GITHUB_WEBHOOK_SECRET")

    # CORS
    cors_origins: list[str] = os.getenv(
        "CORS_ORIGINS",
        "http://localhost:3000,http://localhost:3001"
    ).split(",")

    # Security
    secret_key: str = os.getenv("SECRET_KEY", "change-me-in-production")
    access_token_expire_minutes: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

    # Rate limiting
    rate_limit_requests: int = int(os.getenv("RATE_LIMIT_REQUESTS", "100"))
    rate_limit_window: int = int(os.getenv("RATE_LIMIT_WINDOW", "900"))  # 15 minutes

    class Config:
        # Try multiple env files in order of priority
        env_file = [
            ".env.production.local",
            ".env.local",
            ".env.production",
            ".env"
        ]
        env_file_encoding = "utf-8"
        case_sensitive = False


settings = Settings()