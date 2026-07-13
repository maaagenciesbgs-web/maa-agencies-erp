from fastapi import APIRouter
from sqlmodel import select

from database import get_session
from models import (
    Sale,
    SaleItem,
    SaleCreate,
    Product,
    Customer,
)

router = APIRouter(
    prefix="/sales",
    tags=["Sales"],
)
# =====================================
# GET ALL SALES
# =====================================

@router.get("/")
def get_sales():

    with get_session() as session:

        sales = session.exec(
            select(Sale).order_by(Sale.id.desc())
        ).all()

        result = []

        for sale in sales:

            customer = session.get(Customer, sale.customer_id)

            result.append({
                "id": sale.id,
                "invoice_number": sale.invoice_number,
                "invoice_date": sale.invoice_date,
                "customer_name": customer.name if customer else "",
                "grand_total": sale.grand_total,
            })

        return result
        # =====================================
# NEXT INVOICE
# =====================================

@router.get("/next-invoice")
def next_invoice():

    with get_session() as session:

        last_sale = session.exec(
            select(Sale).order_by(Sale.id.desc())
        ).first()

        next_no = 1

        if last_sale:
            next_no = last_sale.id + 1

        return {
            "invoice_number": f"INV-2026-{next_no:04d}"
        }
        # ==========================================
# GET ALL SALES
# ==========================================

@router.get("/")
def get_sales():

    with get_session() as session:

        return session.exec(
            select(Sale)
        ).all()
        # ==========================================
# GET ALL SALES
# ==========================================

@router.get("/")
def get_sales():

    with get_session() as session:

        sales = session.exec(
            select(Sale).order_by(Sale.id.desc())
        ).all()

        result = []

        for sale in sales:

            customer = session.get(Customer, sale.customer_id)

            result.append({
                "id": sale.id,
                "invoice_number": sale.invoice_number,
                "invoice_date": sale.invoice_date,
                "customer_name": customer.name if customer else "",
                "grand_total": sale.grand_total,
            })

        return result
        # ==========================================
# NEXT INVOICE NUMBER
# ==========================================

@router.get("/next-invoice")
def next_invoice():

    with get_session() as session:

        last_sale = session.exec(
            select(Sale).order_by(Sale.id.desc())
        ).first()

        next_no = 1

        if last_sale:
            next_no = last_sale.id + 1

        return {
            "invoice_number": f"INV-2026-{next_no:04d}"
        }