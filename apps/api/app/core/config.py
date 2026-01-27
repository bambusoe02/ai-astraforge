from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # App settings
    app_name: str = "AstraForge API"
    debug: bool = True
    version: str = "1.0.0"

    # Database
    database_url: str = "postgresql://user:password@localhost/astraforge"

    # Redis
    redis_url: str = "redis://localhost:6379"

    # External APIs
    openai_api_key: Optional[str] = None
    stripe_secret_key: Optional[str] = None
    stripe_publishable_key: Optional[str] = None
    clerk_secret_key: Optional[str] = None

    # GitHub App
    github_app_id: Optional[str] = None
    github_private_key: Optional[str] = None
    github_webhook_secret: Optional[str] = None

    class Config:
        env_file = ".env.local" if __name__ == "__main__" else ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False


settings = Settings()
