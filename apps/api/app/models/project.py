from sqlalchemy import Column, Integer, String, DateTime, Text, JSON, Boolean
from sqlalchemy.sql import func
from .base import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    owner_id = Column(String(255), nullable=False)  # Clerk user ID

    # Repository info
    github_repo = Column(String(255))
    github_owner = Column(String(255))

    # Build status
    status = Column(String(50), default="created")  # created, building, success, failed
    last_build_at = Column(DateTime(timezone=True))
    build_logs = Column(Text)

    # Generated code
    generated_files = Column(JSON)  # Store file paths and content

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    def __repr__(self):
        return f"<Project(id={self.id}, name='{self.name}', status='{self.status}')>"
