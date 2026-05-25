from sqlalchemy import Column, Integer, String, ForeignKey
from app.db.database import Base


class Alert(Base):

    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)

    product_id = Column(Integer, ForeignKey("products.id"))

    severity = Column(String)

    message = Column(String)