from sqlalchemy import Column, Integer, String
from app.db.database import Base


class Job(Base):

    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)

    job_type = Column(String)

    status = Column(String)

    progress = Column(Integer)