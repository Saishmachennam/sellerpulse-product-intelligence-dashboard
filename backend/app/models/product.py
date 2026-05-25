from sqlalchemy import Column, Integer, String, Float
from app.db.database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)

    sku_id = Column(String, unique=True, index=True)
    title = Column(String)
    brand = Column(String)
    category = Column(String)

    price = Column(Float)
    mrp = Column(Float)

    availability = Column(String)