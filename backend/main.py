from fastapi import FastAPI
from products import router as product_router
from database import create_db

app = FastAPI(title="Maa Agencies ERP")

@app.on_event("startup")
def startup():
    create_db()

app.include_router(product_router)

@app.get("/")
def home():
    return {
        "application": "Maa Agencies ERP",
        "status": "Running",
        "version": "1.0"
    }