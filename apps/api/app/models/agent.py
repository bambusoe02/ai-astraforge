from sqlalchemy import Column, Integer, String, DateTime, Text, JSON, ForeignKey
from sqlalchemy.sql import func
from .base import Base


class AgentConversation(Base):
    __tablename__ = "agent_conversations"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    user_id = Column(String(255), nullable=False)  # Clerk user ID

    # Agent info
    agent_type = Column(String(50), nullable=False)  # architect, coder, tester, deployer, monitor
    message = Column(Text, nullable=False)
    response = Column(Text)

    # Metadata
    tokens_used = Column(Integer, default=0)
    processing_time = Column(Integer)  # milliseconds
    status = Column(String(50), default="completed")  # processing, completed, failed

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    def __repr__(self):
        return f"<AgentConversation(id={self.id}, agent='{self.agent_type}', status='{self.status}')>"
