from fastapi import APIRouter, HTTPException
from sqlmodel import select

from database import get_session
from models import Customer

router = APIRouter(
    prefix="/customers",
    tags=["Customers"],
)


# ----------------------------
# Get All Customers
# ----------------------------
@router.get("/")
def get_customers():
    with get_session() as session:
        customers = session.exec(select(Customer)).all()
        return customers


# ----------------------------
# Add Customer
# ----------------------------
@router.post("/")
def add_customer(customer: Customer):
    with get_session() as session:
        session.add(customer)
        session.commit()
        session.refresh(customer)

        return {
            "message": "Customer added successfully",
            "customer": customer,
        }


# ----------------------------
# Update Customer
# ----------------------------
@router.put("/{customer_id}")
def update_customer(customer_id: int, updated_customer: Customer):

    with get_session() as session:

        customer = session.get(Customer, customer_id)

        if customer is None:
            raise HTTPException(
                status_code=404,
                detail="Customer not found",
            )

        customer.name = updated_customer.name
        customer.mobile = updated_customer.mobile
        customer.email = updated_customer.email
        customer.gst_number = updated_customer.gst_number
        customer.address = updated_customer.address
        customer.city = updated_customer.city
        customer.state = updated_customer.state
        customer.opening_balance = updated_customer.opening_balance

        session.add(customer)
        session.commit()
        session.refresh(customer)

        return {
            "message": "Customer updated successfully",
            "customer": customer,
        }


# ----------------------------
# Delete Customer
# ----------------------------
@router.delete("/{customer_id}")
def delete_customer(customer_id: int):

    with get_session() as session:

        customer = session.get(Customer, customer_id)

        if customer is None:
            raise HTTPException(
                status_code=404,
                detail="Customer not found",
            )

        session.delete(customer)
        session.commit()

        return {
            "message": "Customer deleted successfully"
        }
    