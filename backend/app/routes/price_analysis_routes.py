from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from statistics import mean

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


@router.get("/price-analysis")
def price_analysis(
    db: Session = Depends(get_db)
):

    products = db.query(Product).all()

    result = []

    for product in products:

        competitor_prices = db.query(
            CompetitorPrice
        ).filter(
            CompetitorPrice.product_id == product.id
        ).all()

        if not competitor_prices:
            continue

        prices = [
            item.competitor_price
            for item in competitor_prices
        ]

        lowest_price = min(prices)

        average_price = round(mean(prices), 2)

        price_gap_percent = round(
            (
                (product.price - lowest_price)
                / lowest_price
            ) * 100,
            2
        )

        # Recommendation Logic
        if price_gap_percent > 10:

            recommendation = "Reduce price"

        elif price_gap_percent < -10:

            recommendation = "Increase price opportunity"

        else:

            recommendation = "Competitive pricing"

        result.append({

            "product_id": product.id,

            "product_title": product.title,

            "our_price": product.price,

            "lowest_competitor_price": lowest_price,

            "average_competitor_price": average_price,

            "price_gap_percent": price_gap_percent,

            "recommended_action": recommendation

        })

    return result