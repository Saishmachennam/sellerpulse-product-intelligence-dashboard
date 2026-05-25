from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import SessionLocal

from app.models.product import Product
from app.models.competitor_price import CompetitorPrice

router = APIRouter()


# Database Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/generate-competitor-prices")
def generate_competitor_prices(
    db: Session = Depends(get_db)
):

    products = db.query(Product).all()

    platforms = [
        "Amazon",
        "Myntra",
        "Ajio"
    ]

    for product in products:

        for platform in platforms:

            competitor = CompetitorPrice(

                product_id=product.id,

                platform=platform,

                competitor_price=product.price - 200,

                competitor_url="https://example.com"

            )

            db.add(competitor)

    db.commit()

    return {
        "message": "Competitor prices generated"
    }


@router.get("/competitor-prices")
def get_competitor_prices(
    db: Session = Depends(get_db)
):

    competitor_prices = db.query(
        CompetitorPrice
    ).all()

    result = []

    for item in competitor_prices:

        result.append({

            "id": item.id,

            "product_id": item.product_id,

            "platform": item.platform,

            "competitor_price": item.competitor_price,

            "competitor_url": item.competitor_url

        })

    return result