from pydantic import BaseModel

class ProductCreate(BaseModel):
    sku_id: str
    title: str
    brand: str

class ProductResponse(ProductCreate):
    id: int

    class Config:
        from_attributes = True