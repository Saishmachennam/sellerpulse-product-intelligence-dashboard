from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.models.issue import Issue

router = APIRouter()


# Database Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/issues")
def get_issues(db: Session = Depends(get_db)):

    issues = db.query(Issue).all()

    result = []

    for issue in issues:
        result.append({
            "id": issue.id,
            "product_id": issue.product_id,
            "severity": issue.severity,
            "issue_type": issue.issue_type,
            "message": issue.message,
            "suggested_fix": issue.suggested_fix
        })

    return result