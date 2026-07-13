from fastapi import APIRouter, HTTPException
from sqlmodel import select

from database import get_session
from models import Supplier

router = APIRouter(
    prefix="/suppliers",
    tags=["Suppliers"],
)


# -----------------------------
# Get All Suppliers
# -----------------------------
@router.get("/")
def get_suppliers():
    with get_session() as session:
        suppliers = session.exec(select(Supplier)).all()
        return suppliers


# -----------------------------
# Add Supplier
# -----------------------------
@router.post("/")
def add_supplier(supplier: Supplier):
    with get_session() as session:
        session.add(supplier)
        session.commit()
        session.refresh(supplier)

        return {
            "message": "Supplier added successfully",
            "supplier": supplier,
            
        }


# -----------------------------
# Update Supplier
# -----------------------------
@router.put("/{supplier_id}")
def update_supplier(supplier_id: int, updated_supplier: Supplier):

    with get_session() as session:

        supplier = session.get(Supplier, supplier_id)

        if supplier is None:
            raise HTTPException(
                status_code=404,
                detail="Supplier not found",
            )

        supplier.name = updated_supplier.name
        supplier.mobile = updated_supplier.mobile
        supplier.email = updated_supplier.email
        supplier.gst_number = updated_supplier.gst_number
        supplier.address = updated_supplier.address
        supplier.city = updated_supplier.city
        supplier.state = updated_supplier.state
        supplier.opening_balance = updated_supplier.opening_balance

        session.add(supplier)
        session.commit()
        session.refresh(supplier)

        return {
            "message": "Supplier updated successfully",
            "supplier": supplier,
        }


# -----------------------------
# Delete Supplier
# -----------------------------
@router.delete("/{supplier_id}")
def delete_supplier(supplier_id: int):

    with get_session() as session:

        supplier = session.get(Supplier, supplier_id)

        if supplier is None:
            raise HTTPException(
                status_code=404,
                detail="Supplier not found",
            )

        session.delete(supplier)
        session.commit()

        return {
            "message": "Supplier deleted successfully"
        }