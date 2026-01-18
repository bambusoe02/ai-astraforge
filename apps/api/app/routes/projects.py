from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.models.project import Project

router = APIRouter()


class ProjectCreate(BaseModel):
    name: str
    description: Optional[str] = None
    owner_id: str


class ProjectResponse(BaseModel):
    id: int
    name: str
    description: Optional[str]
    owner_id: str
    status: str
    github_repo: Optional[str]
    created_at: str


@router.post("/", response_model=ProjectResponse)
async def create_project(
    project: ProjectCreate,
    db: Session = Depends(get_db)
):
    """Create a new project"""
    db_project = Project(
        name=project.name,
        description=project.description,
        owner_id=project.owner_id,
        status="created"
    )
    db.add(db_project)
    db.commit()
    db.refresh(db_project)

    return ProjectResponse(
        id=db_project.id,
        name=db_project.name,
        description=db_project.description,
        owner_id=db_project.owner_id,
        status=db_project.status,
        github_repo=db_project.github_repo,
        created_at=db_project.created_at.isoformat()
    )


@router.get("/", response_model=List[ProjectResponse])
async def list_projects(
    owner_id: str,
    db: Session = Depends(get_db)
):
    """List projects for a user"""
    projects = db.query(Project).filter(Project.owner_id == owner_id).all()
    return [
        ProjectResponse(
            id=p.id,
            name=p.name,
            description=p.description,
            owner_id=p.owner_id,
            status=p.status,
            github_repo=p.github_repo,
            created_at=p.created_at.isoformat()
        )
        for p in projects
    ]


@router.get("/{project_id}", response_model=ProjectResponse)
async def get_project(
    project_id: int,
    db: Session = Depends(get_db)
):
    """Get a specific project"""
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    return ProjectResponse(
        id=project.id,
        name=project.name,
        description=project.description,
        owner_id=project.owner_id,
        status=project.status,
        github_repo=project.github_repo,
        created_at=project.created_at.isoformat()
    )


@router.put("/{project_id}/status")
async def update_project_status(
    project_id: int,
    status: str,
    db: Session = Depends(get_db)
):
    """Update project build status"""
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    project.status = status
    db.commit()

    return {"message": "Project status updated", "status": status}
