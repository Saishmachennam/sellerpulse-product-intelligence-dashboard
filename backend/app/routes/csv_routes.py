from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session
import pandas as pd
import io

from app.db.database import SessionLocal
from app.models.product import Product
from app.models.issue import Issue
from app.validators.product_validator import validate_product
from app.models.alert import Alert
from app.models.job import Job

router = APIRouter()


# Database Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/upload-products-csv")
async def upload_products_csv(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    contents = await file.read()

    df = pd.read_csv(io.BytesIO(contents))

    job = Job(

        job_type="CSV_UPLOAD",

        status="RUNNING",

        progress=20
    )

    db.add(job)

    db.commit()

    db.refresh(job)

    products_added = []
    skipped_duplicates = []

    for _, row in df.iterrows():

        sku_id = str(row["sku_id"])

        # Duplicate SKU Check
        existing_product = db.query(Product).filter(
            Product.sku_id == sku_id
        ).first()

        if existing_product:
            skipped_duplicates.append(sku_id)
            continue

        # Create Product
        product = Product(
            sku_id=sku_id,

            title=(
                None
                if pd.isna(row["product_title"])
                else str(row["product_title"])
            ),

            brand=(
                None
                if pd.isna(row["brand"])
                else str(row["brand"])
            ),

            category=(
                None
                if pd.isna(row["category"])
                else str(row["category"])
            ),

            price=(
                None
                if pd.isna(row["price"])
                else float(row["price"])
            ),

            mrp=(
                None
                if pd.isna(row["mrp"])
                else float(row["mrp"])
            ),

            availability=(
                None
                if pd.isna(row["availability"])
                else str(row["availability"])
            )
        )

        db.add(product)

        # Save product first
        db.commit()

        # Refresh to get ID
        db.refresh(product)

        # Validate Product
        validation_issues = validate_product(product)
        #print(validation_issues)

        # Create Issues
        for issue_data in validation_issues:

            issue = Issue(
                product_id=product.id,
                severity=issue_data["severity"],
                issue_type=issue_data["issue_type"],
                message=issue_data["message"],
                suggested_fix=issue_data["suggested_fix"]
            )

            db.add(issue)
            # Create alert for HIGH severity issues
            if issue_data["severity"] == "HIGH":
                alert = Alert(
                    product_id=product.id,
                    severity=issue_data["severity"],
                    message=issue_data["message"]
                )

                db.add(alert)

        # Commit issues
        db.commit()

        products_added.append(product.sku_id)
    
    job.status = "COMPLETED"

    job.progress = 100

    db.commit()

    return {
        "message": "CSV uploaded successfully",
        "products_added": products_added,
        "skipped_duplicates": skipped_duplicates
    }