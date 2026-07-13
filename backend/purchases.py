from fastapi import APIRouter
from sqlmodel import select

from database import get_session
from models import (
    Purchase,
    PurchaseItem,
    PurchaseCreate,
    Product,
    Supplier,
)

router = APIRouter(
    prefix="/purchases",
    tags=["Purchases"],
)


# ==========================================
# GET ALL PURCHASES
# ==========================================


@router.get("/")
def get_purchases():

    with get_session() as session:

        purchases = session.exec(
            select(Purchase)
        ).all()

        return purchases

@router.get("/{purchase_id}")
def get_purchase(purchase_id: int):

    with get_session() as session:

        purchase = session.get(Purchase, purchase_id)

        if not purchase:
            return {
                "message": "Purchase not found"
            }

        supplier = session.get(Supplier, purchase.supplier_id)

        items = session.exec(
            select(PurchaseItem).where(
                PurchaseItem.purchase_id == purchase_id
            )
        ).all()

        item_list = []

        for item in items:

            product = session.get(Product, item.product_id)

            item_list.append({

                "id": item.id,

                "product_id": item.product_id,

                "product_name": product.name if product else "",

                "quantity": item.quantity,

                "rate": item.rate,

                "discount_percent": item.discount_percent,

                "discount_amount": item.discount_amount,

                "gst": item.gst,

                "amount": item.amount,

            })

        return {

            "purchase": purchase,

            "supplier_name": supplier.name if supplier else "",

            "items": item_list,

        }


# ==========================================
# SAVE PURCHASE
# ==========================================

@router.post("/")
def save_purchase(data: PurchaseCreate):

    with get_session() as session:

        # -------------------------------
        # Save Purchase Header
        # -------------------------------

        purchase = Purchase(
            supplier_id=data.supplier_id,
            invoice_number=data.invoice_number,
            invoice_date=data.invoice_date,
            subtotal=data.subtotal,
            gst=data.gst,
            grand_total=data.grand_total,
        )

        session.add(purchase)
        session.commit()
        session.refresh(purchase)

        # -------------------------------
        # Save Items
        # -------------------------------

        for item in data.items:

            purchase_item = PurchaseItem(
                purchase_id=purchase.id,
                product_id=item.product_id,
                quantity=item.quantity,
                rate=item.rate,
                discount_percent=item.discount_percent,
                discount_amount=item.discount_amount,
                gst=item.gst,
                amount=item.amount,
            )

            session.add(purchase_item)

            # ----------------------------
            # Update Product Stock
            # ----------------------------

            product = session.get(Product, item.product_id)

            if product:

                product.stock += item.quantity

                product.purchase_price = item.rate

                session.add(product)

        session.commit()

        return {
            "message": "Purchase Saved Successfully",
            "purchase_id": purchase.id,
        }

# ==========================================
# UPDATE PURCHASE
# ==========================================

@router.put("/{purchase_id}")
def update_purchase(purchase_id: int, data: PurchaseCreate):

    with get_session() as session:

        purchase = session.get(Purchase, purchase_id)

        if not purchase:
            return {
                "message": "Purchase not found"
            }

        # ---------------------------------
        # Reverse previous stock
        # ---------------------------------

        old_items = session.exec(
            select(PurchaseItem).where(
                PurchaseItem.purchase_id == purchase_id
            )
        ).all()

        for item in old_items:

            product = session.get(Product, item.product_id)

            if product:
                product.stock -= item.quantity
                session.add(product)

            session.delete(item)

        # ---------------------------------
        # Update Purchase Header
        # ---------------------------------

        purchase.supplier_id = data.supplier_id
        purchase.invoice_number = data.invoice_number
        purchase.invoice_date = data.invoice_date
        purchase.subtotal = data.subtotal
        purchase.gst = data.gst
        purchase.grand_total = data.grand_total

        session.add(purchase)

        # ---------------------------------
        # Save New Items
        # ---------------------------------

        for item in data.items:

            purchase_item = PurchaseItem(
                purchase_id=purchase.id,
                product_id=item.product_id,
                quantity=item.quantity,
                rate=item.rate,
                discount_percent=item.discount_percent,
                discount_amount=item.discount_amount,
                gst=item.gst,
                amount=item.amount,
            )

            session.add(purchase_item)

            product = session.get(Product, item.product_id)

            if product:

                product.stock += item.quantity
                product.purchase_price = item.rate

                session.add(product)

        session.commit()

        return {
            "message": "Purchase Updated Successfully"
        }

# ==========================================
# DELETE PURCHASE
# ==========================================

@router.delete("/{purchase_id}")
def delete_purchase(purchase_id: int):

    with get_session() as session:

        purchase = session.get(Purchase, purchase_id)

        if purchase:

            items = session.exec(
                select(PurchaseItem).where(
                    PurchaseItem.purchase_id == purchase.id
                )
            ).all()

            for item in items:

                product = session.get(Product, item.product_id)

                if product:
                    product.stock -= item.quantity
                    session.add(product)

                session.delete(item)

            session.delete(purchase)

            session.commit()

        return {
            "message": "Purchase Deleted"
        }
        # ==========================================
# GET SINGLE PURCHASE
# ==========================================

