from purchases import router as purchase_router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import select
from sales import router as sales_router
from database import create_db, get_session
from products import router as product_router
from customers import router as customer_router
from suppliers import router as supplier_router
from models import Product, Customer, Supplier, Purchase, PurchaseItem

app = FastAPI(title="Flowtica ERP")


# -----------------------------
# CORS
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------
# Create Database
# -----------------------------
@app.on_event("startup")
def startup():
    create_db()


# -----------------------------
# Routers
# -----------------------------
app.include_router(product_router)
app.include_router(customer_router)
app.include_router(supplier_router)
app.include_router(purchase_router)
app.include_router(sales_router)


# -----------------------------
# Home
# -----------------------------
@app.get("/")
def home():
    return {
        "application": "Flowtica ERP",
        "status": "Running",
        "version": "1.0",
    }


# -----------------------------
# Dashboard
# -----------------------------
@app.get("/dashboard")
def dashboard():

    with get_session() as session:

        products = session.exec(select(Product)).all()
        customers = session.exec(select(Customer)).all()
        suppliers = session.exec(select(Supplier)).all()

        total_products = len(products)
        total_customers = len(customers)
        total_suppliers = len(suppliers)

        low_stock = len(
            [product for product in products if product.stock < 10]
        )

        return {
            "products": total_products,
            "customers": total_customers,
            "suppliers": total_suppliers,
            "sales_today": 0,
            "low_stock": low_stock,
        }