from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.models.product import Product
from app.models.issue import Issue

router = APIRouter()


# Database Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/dashboard/quality-summary")
def quality_summary(db: Session = Depends(get_db)):

    total_products = db.query(Product).count()

    total_issues = db.query(Issue).count()

    high_issues = db.query(Issue).filter(
        Issue.severity == "HIGH"
    ).count()

    medium_issues = db.query(Issue).filter(
        Issue.severity == "MEDIUM"
    ).count()

    low_issues = db.query(Issue).filter(
        Issue.severity == "LOW"
    ).count()

    # Simple quality score
    quality_score = max(
        0,
        100 - (high_issues * 20) - (medium_issues * 10) - (low_issues * 5)
    )

    return {
        "total_products": total_products,
        "total_issues": total_issues,
        "high_issues": high_issues,
        "medium_issues": medium_issues,
        "low_issues": low_issues,
        "quality_score": quality_score
    }