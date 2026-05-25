from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.models.alert import Alert

router = APIRouter()


# Database Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/alerts")
def get_alerts(db: Session = Depends(get_db)):

    alerts = db.query(Alert).all()

    result = []

    for alert in alerts:
        result.append({
            "id": alert.id,
            "product_id": alert.product_id,
            "severity": alert.severity,
            "message": alert.message
        })

    return result