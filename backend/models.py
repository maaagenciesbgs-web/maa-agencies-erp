from typing import Optional
from sqlmodel import SQLModel, Field


# =========================
# Product Model
# =========================

class Product(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    name: str
    category: str
    brand: str

    purchase_price: float
    selling_price: float

    stock: int
    gst: int


# =========================
# Customer Model
# =========================

class Customer(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    name: str
    mobile: str

    email: Optional[str] = None
    gst_number: Optional[str] = None

    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None

    opening_balance: float = 0


# =========================
# Supplier Model
# =========================

class Supplier(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    name: str
    mobile: str
    email: Optional[str] = None
    gst_number: Optional[str] = None

    address: str
    city: str
    state: str

    opening_balance: float = 0


# =========================
# Purchase Model
# =========================

class Purchase(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    supplier_id: int

    invoice_number: str
    invoice_date: str

    subtotal: float
    gst: float
    grand_total: float


# =========================
# Purchase Item Model
# =========================

class PurchaseItem(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    purchase_id: int
    product_id: int

    quantity: int
    rate: float

    discount_percent: float = 0
    discount_amount: float = 0

    gst: float
    amount: float


# =========================
# Purchase Request Models
# =========================

class PurchaseItemCreate(SQLModel):
    product_id: int

    quantity: int
    rate: float

    discount_percent: float = 0
    discount_amount: float = 0

    gst: float
    amount: float


class PurchaseCreate(SQLModel):
    supplier_id: int

    invoice_number: str
    invoice_date: str

    subtotal: float
    gst: float
    grand_total: float

    items: list[PurchaseItemCreate]


# =========================
# Sale Model
# =========================

class Sale(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    customer_id: int

    invoice_number: str
    invoice_date: str

    subtotal: float

discount: float = 0              # Item Discount

special_discount: float = 0      # Invoice Discount

taxable_amount: float = 0

gst: float

cgst: float = 0
sgst: float = 0

round_off: float = 0

grand_total: float


# =========================
# Sale Item Model
# =========================

class SaleItem(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    sale_id: int
    product_id: int

    quantity: int
    rate: float

    discount_percent: float = 0
    discount_amount: float = 0

    gst: float
    amount: float


# =========================
# Sale Request Models
# =========================

class SaleItemCreate(SQLModel):
    product_id: int

    quantity: int
    rate: float

    discount_percent: float = 0
    discount_amount: float = 0

    gst: float
    amount: float


class SaleCreate(SQLModel):

    customer_id: int

    invoice_number: str
    invoice_date: str

    subtotal: float

    discount: float = 0
    special_discount: float = 0
    taxable_amount: float = 0

    gst: float

    cgst: float = 0
    sgst: float = 0

    round_off: float = 0

    grand_total: float

    items: list[SaleItemCreate]