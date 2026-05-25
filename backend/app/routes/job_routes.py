from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import SessionLocal

from app.models.job import Job

router = APIRouter()


# Database Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/jobs")
def get_jobs(
    db: Session = Depends(get_db)
):

    jobs = db.query(Job).all()

    result = []

    for job in jobs:

        result.append({

            "id": job.id,

            "job_type": job.job_type,

            "status": job.status,

            "progress": job.progress

        })

    return result