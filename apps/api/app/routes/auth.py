from fastapi import APIRouter, HTTPException, Depends, Request
from pydantic import BaseModel
from typing import Optional

router = APIRouter()


class UserInfo(BaseModel):
    user_id: str
    email: str
    name: Optional[str] = None


@router.get("/me")
async def get_current_user(request: Request):
    """Get current user info from Clerk JWT"""
    # In a real implementation, you'd validate the Clerk JWT token
    # For now, return mock data
    return {
        "user_id": "user_123",
        "email": "user@example.com",
        "name": "Demo User"
    }


@router.post("/webhook/clerk")
async def clerk_webhook(request: Request):
    """Handle Clerk webhooks for user events"""
    # Process Clerk webhooks
    data = await request.json()
    print(f"Received Clerk webhook: {data}")
    return {"status": "ok"}
