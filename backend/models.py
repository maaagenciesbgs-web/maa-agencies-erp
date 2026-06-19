from typing import Optional
from sqlmodel import SQLModel, Field

class Product(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    name: str
    category: str
    brand: str
    purchase_price: float
    selling_price: float
    stock: int
    gst: int
    