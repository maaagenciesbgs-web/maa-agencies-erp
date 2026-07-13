import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ProductSearch from "../components/ProductSearch";

function PurchaseForm() {

  const { id } = useParams();
const isEdit = !!id;

useEffect(() => {
  if (!isEdit) return;

  fetch(`http://127.0.0.1:8000/purchases/${id}`)
    .then((res) => res.json())
    .then((data) => {

      setPurchase({
        supplier_id: data.purchase.supplier_id,
        invoice_number: data.purchase.invoice_number,
        invoice_date: data.purchase.invoice_date,
      });

      setItems(
        data.items.map((item) => ({
          product_id: item.product_id,
          product_name: item.product_name,
          quantity: item.quantity,
          rate: item.rate,
          discount_percent: item.discount_percent,
          discount_amount: item.discount_amount,
          gst: item.gst,
          amount: item.amount,
        }))
      );

    });
}, [id]);

  const [suppliers, setSuppliers] = useState([]);

  const [purchase, setPurchase] = useState({
    supplier_id: "",
    invoice_number: "",
    invoice_date: new Date().toISOString().split("T")[0],
  });

  const [items, setItems] = useState([
    {
      product_id: "",
      product_name: "",
      quantity: 1,
      rate: 0,
      discount_percent: 0,
      discount_amount: 0,
      gst: 18,
      amount: 0,
    },
  ]);

  useEffect(() => {
  fetch("http://127.0.0.1:8000/suppliers/")
    .then((res) => res.json())
    .then((data) => setSuppliers(data));

  if (isEdit) {
    fetch(`http://127.0.0.1:8000/purchases/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPurchase({
          supplier_id: data.purchase.supplier_id,
          invoice_number: data.purchase.invoice_number,
          invoice_date: data.purchase.invoice_date,
        });

        setItems(
          data.items.map((item) => ({
            product_id: item.product_id,
            product_name: item.product_name,
            quantity: item.quantity,
            rate: item.rate,
            discount_percent: item.discount_percent,
            discount_amount: item.discount_amount,
            gst: item.gst,
            amount: item.amount,
          }))
        );
      });
  }
}, []);

  const updateItem = (index, field, value) => {

    const newItems = [...items];

    newItems[index][field] = value === "" ? "" : Number(value);

    const qty = Number(newItems[index].quantity) || 0;
    const rate = Number(newItems[index].rate) || 0;

    const gross = qty * rate;

    if (field === "discount_percent") {
      newItems[index].discount_amount =
        gross *
        (Number(newItems[index].discount_percent) || 0) /
        100;
    }

    if (field === "discount_amount") {

      if (gross > 0) {

        newItems[index].discount_percent =
          ((Number(newItems[index].discount_amount) || 0) * 100) /
          gross;

      } else {

        newItems[index].discount_percent = 0;

      }
    }

    const discount =
      Number(newItems[index].discount_amount) || 0;

    const taxable = gross - discount;

    const gst =
      taxable *
      (Number(newItems[index].gst) || 0) /
      100;

    newItems[index].amount = taxable + gst;

    setItems(newItems);
  };

  const subtotal = items.reduce((sum, item) => {
    return sum + ((Number(item.quantity) || 0) * (Number(item.rate) || 0));
  }, 0);

  const totalDiscount = items.reduce((sum, item) => {

    const gross =
      (Number(item.quantity) || 0) *
      (Number(item.rate) || 0);

    if ((Number(item.discount_percent) || 0) > 0) {
      return sum + gross * Number(item.discount_percent) / 100;
    }

    return sum + (Number(item.discount_amount) || 0);

  }, 0);

  const taxable = subtotal - totalDiscount;

  const totalGST = items.reduce((sum, item) => {

    const gross =
      (Number(item.quantity) || 0) *
      (Number(item.rate) || 0);

    let discount = 0;

    if ((Number(item.discount_percent) || 0) > 0) {

      discount =
        gross *
        Number(item.discount_percent) /
        100;

    } else {

      discount =
        Number(item.discount_amount) || 0;

    }

    const taxable = gross - discount;

    return (
      sum +
      taxable *
      (Number(item.gst) || 0) /
      100
    );

  }, 0);

  const grandTotal = taxable + totalGST;
  return (
  <MainLayout>
    <div
      style={{
        padding: "30px",
        maxWidth: "1250px",
        margin: "auto",
      }}
    >
      <h1>
  {isEdit ? "✏ Edit Purchase" : "🛒 New Purchase"}
</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "20px",
          marginTop: "25px",
        }}
      >
        <div>
          <label>Supplier</label>

          <select
            value={purchase.supplier_id}
            onChange={(e) =>
              setPurchase({
                ...purchase,
                supplier_id: e.target.value,
              })
            }
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
            }}
          >
            <option value="">Select Supplier</option>

            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Invoice Number</label>

          <input
            type="text"
            value={purchase.invoice_number}
            onChange={(e) =>
              setPurchase({
                ...purchase,
                invoice_number: e.target.value,
              })
            }
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
            }}
          />
        </div>

        <div>
          <label>Invoice Date</label>

          <input
            type="date"
            value={purchase.invoice_date}
            onChange={(e) =>
              setPurchase({
                ...purchase,
                invoice_date: e.target.value,
              })
            }
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
            }}
          />
        </div>
      </div>

      <h2 style={{ marginTop: "40px" }}>
        Purchase Items
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
          background: "white",
        }}
      >
        <thead
          style={{
            background: "#1976d2",
            color: "white",
          }}
        >
          <tr>
            <th style={{ padding: "12px" }}>Product</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Disc %</th>
            <th>Disc ₹</th>
            <th>GST %</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td style={{ padding: "10px" }}>
                <ProductSearch
                  value={item.product_name}
                  onSelect={(product) => {
                    const newItems = [...items];

                    newItems[index].product_id = product.id;
                    newItems[index].product_name = product.name;
                    newItems[index].rate = product.purchase_price;
                    newItems[index].gst = product.gst;

                    const gross = product.purchase_price;
                    const gst = gross * product.gst / 100;

                    newItems[index].amount = gross + gst;

                    setItems(newItems);
                  }}
                />
              </td>

              <td>
                <input
                  type="text"
                  inputMode="numeric"
                  value={item.quantity}
                  onChange={(e) =>
                    updateItem(index, "quantity", e.target.value)
                  }
                  style={{
                    width: "70px",
                    padding: "7px",
                  }}
                />
              </td>

              <td>
                <input
                  type="text"
                  inputMode="decimal"
                  value={item.rate}
                  onChange={(e) =>
                    updateItem(index, "rate", e.target.value)
                  }
                  style={{
                    width: "90px",
                    padding: "7px",
                  }}
                />
              </td>

              <td>
                <input
                  type="text"
                  inputMode="decimal"
                  value={item.discount_percent}
                  onChange={(e) =>
                    updateItem(
                      index,
                      "discount_percent",
                      e.target.value
                    )
                  }
                  style={{
                    width: "70px",
                    padding: "7px",
                  }}
                />
              </td>

              <td>
                <input
                  type="text"
                  inputMode="decimal"
                  value={item.discount_amount}
                  onChange={(e) =>
                    updateItem(
                      index,
                      "discount_amount",
                      e.target.value
                    )
                  }
                  style={{
                    width: "80px",
                    padding: "7px",
                  }}
                />
              </td>

              <td>
                <input
                  type="text"
                  inputMode="decimal"
                  value={item.gst}
                  onChange={(e) =>
                    updateItem(index, "gst", e.target.value)
                  }
                  style={{
                    width: "70px",
                    padding: "7px",
                  }}
                />
              </td>

              <td
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                ₹{Number(item.amount).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() =>
          setItems([
            ...items,
            {
              product_id: "",
              product_name: "",
              quantity: 1,
              rate: 0,
              discount_percent: 0,
              discount_amount: 0,
              gst: 18,
              amount: 0,
            },
          ])
        }
        style={{
          marginTop: "20px",
          background: "#1976d2",
          color: "white",
          border: "none",
          padding: "12px 20px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        ➕ Add Product
      </button>
            <div
        style={{
          marginTop: "35px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <div
          style={{
            width: "350px",
            background: "#ffffff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 3px 10px rgba(0,0,0,.15)",
          }}
        >
          <table style={{ width: "100%" }}>
            <tbody>
              <tr>
                <td><b>Subtotal</b></td>
                <td style={{ textAlign: "right" }}>
                  ₹{subtotal.toFixed(2)}
                </td>
              </tr>

              <tr>
                <td><b>Discount</b></td>
                <td style={{ textAlign: "right" }}>
                  ₹{totalDiscount.toFixed(2)}
                </td>
              </tr>

              <tr>
                <td><b>Taxable</b></td>
                <td style={{ textAlign: "right" }}>
                  ₹{taxable.toFixed(2)}
                </td>
              </tr>

              <tr>
                <td><b>GST</b></td>
                <td style={{ textAlign: "right" }}>
                  ₹{totalGST.toFixed(2)}
                </td>
              </tr>

              <tr
                style={{
                  fontSize: "20px",
                  color: "#1976d2",
                  fontWeight: "bold",
                }}
              >
                <td>Grand Total</td>
                <td style={{ textAlign: "right" }}>
                  ₹{grandTotal.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "flex-end",
          gap: "15px",
        }}
      >
        <button
          onClick={() => {
            setPurchase({
              supplier_id: "",
              invoice_number: "",
              invoice_date: new Date().toISOString().split("T")[0],
            });

            setItems([
              {
                product_id: "",
                product_name: "",
                quantity: 1,
                rate: 0,
                discount_percent: 0,
                discount_amount: 0,
                gst: 18,
                amount: 0,
              },
            ]);
          }}
          style={{
            background: "#9e9e9e",
            color: "white",
            border: "none",
            padding: "12px 25px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>

        <button
          onClick={async () => {
            if (!purchase.supplier_id) {
              alert("Please select supplier");
              return;
            }

            if (!items[0].product_id) {
              alert("Please add at least one product");
              return;
            }

            const purchaseData = {
  supplier_id: Number(purchase.supplier_id),
  invoice_number: purchase.invoice_number,
  invoice_date: purchase.invoice_date,
  subtotal: subtotal,
  gst: totalGST,
  grand_total: grandTotal,

  items: items.map(item => ({
    product_id: Number(item.product_id),
    quantity: Number(item.quantity),
    rate: Number(item.rate),
    discount_percent: Number(item.discount_percent),
    discount_amount: Number(item.discount_amount),
    gst: Number(item.gst),
    amount: Number(item.amount),
  })),
};

            try {
              console.log("Sending Purchase Data");
console.log(JSON.stringify(purchaseData, null, 2));
              const response = await fetch(
  isEdit
    ? `http://127.0.0.1:8000/purchases/${id}`
    : "http://127.0.0.1:8000/purchases/",
  {
    method: isEdit ? "PUT" : "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(purchaseData),
                }
              );

              if (response.ok) {
               alert(
  isEdit
    ? "Purchase Updated Successfully"
    : "Purchase Saved Successfully"
);

                setPurchase({
                  supplier_id: "",
                  invoice_number: "",
                  invoice_date: new Date().toISOString().split("T")[0],
                });

                setItems([
                  {
                    product_id: "",
                    product_name: "",
                    quantity: 1,
                    rate: 0,
                    discount_percent: 0,
                    discount_amount: 0,
                    gst: 18,
                    amount: 0,
                  },
                ]);
              } else {
                alert("Failed to save purchase");
              }
            } catch (err) {
              console.log(err);
              alert("Server Error");
            }
          }}
          style={{
            background: "#2e7d32",
            color: "white",
            border: "none",
            padding: "12px 30px",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {isEdit ? "💾 Update Purchase" : "💾 Save Purchase"}
        </button>
      </div>

    </div>
  </MainLayout>
);

}

export default PurchaseForm;