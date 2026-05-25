from sqlalchemy import Column, Integer, String, ForeignKey
from app.db.database import Base

class Issue(Base):
    __tablename__ = "issues"

    id = Column(Integer, primary_key=True, index=True)

    product_id = Column(Integer, ForeignKey("products.id"))

    severity = Column(String)
    issue_type = Column(String)

    message = Column(String)
    suggested_fix = Column(String)