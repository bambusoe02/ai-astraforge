from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.services.agent_service import AgentService

router = APIRouter()


class AgentRequest(BaseModel):
    message: str
    project_id: int
    agent_type: str = "architect"  # architect, coder, tester, deployer, monitor


class AgentResponse(BaseModel):
    response: str
    agent_type: str
    project_id: int
    tokens_used: int = 0


@router.post("/", response_model=AgentResponse)
async def chat_with_agent(
    request: AgentRequest,
    db: Session = Depends(get_db)
):
    """Send a message to an AI agent"""
    try:
        agent_service = AgentService(db)
        response = await agent_service.process_message(
            request.message,
            request.project_id,
            request.agent_type
        )

        return AgentResponse(
            response=response["content"],
            agent_type=request.agent_type,
            project_id=request.project_id,
            tokens_used=response.get("tokens_used", 0)
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Agent processing failed: {str(e)}")


@router.get("/status")
async def get_agent_status():
    """Get status of all agents"""
    return {
        "architect": {"status": "active", "description": "System design and architecture"},
        "coder": {"status": "active", "description": "Code generation across platforms"},
        "tester": {"status": "active", "description": "Automated testing and QA"},
        "deployer": {"status": "active", "description": "CI/CD and deployment"},
        "monitor": {"status": "active", "description": "System monitoring and alerting"}
    }
