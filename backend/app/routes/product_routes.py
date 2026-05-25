from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.models.product import Product
from app.schemas.product_schema import ProductCreate

router = APIRouter()

# Database dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Create Product
@router.post("/products")
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    
    new_product = Product(
        sku_id=product.sku_id,
        title=product.title,
        brand=product.brand
    )

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product

# Get All Products
@router.get("/products")
def get_products(db: Session = Depends(get_db)):
    return db.query(Product).all()