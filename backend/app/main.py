from fastapi import FastAPI
from app.db.database import engine, Base
from app.models.issue import Issue
from app.models.product import Product
from app.routes.issue_routes import router as issue_router
from app.routes.product_routes import router as product_router
from app.routes.csv_routes import router as csv_router
from app.routes.dashboard_routes import router as dashboard_router
from app.models.alert import Alert
from app.routes.alert_routes import router as alert_router
from fastapi.middleware.cors import CORSMiddleware
from app.models.competitor_price import CompetitorPrice
from app.routes.competitor_routes import router as competitor_router
from app.routes.ai_routes import router as ai_router
from app.routes.price_analysis_routes import router as price_analysis_router
from app.routes.video_routes import router as video_router
from app.models.job import Job
from app.routes.job_routes import router as job_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(issue_router)
app.include_router(product_router)
app.include_router(csv_router)
app.include_router(dashboard_router)
app.include_router(alert_router)
app.include_router(competitor_router)
app.include_router(ai_router)
app.include_router(price_analysis_router)
app.include_router(video_router)
app.include_router(job_router)

@app.get("/")
def root():
    return {"message": "SellerPulse API Running"}