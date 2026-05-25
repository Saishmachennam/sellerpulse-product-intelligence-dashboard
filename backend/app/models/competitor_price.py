from sqlalchemy import Column, Integer, String, Float, ForeignKey
from app.db.database import Base


class CompetitorPrice(Base):

    __tablename__ = "competitor_prices"

    id = Column(Integer, primary_key=True, index=True)

    product_id = Column(Integer, ForeignKey("products.id"))

    platform = Column(String)

    competitor_price = Column(Float)

    competitor_url = Column(String)