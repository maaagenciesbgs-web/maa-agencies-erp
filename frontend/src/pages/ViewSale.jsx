import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

function ViewSale() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sale, setSale] = useState(null);
  const [items, setItems] = useState([]);
  const [customerName, setCustomerName] = useState("");

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/sales/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setSale(data.sale);
        setItems(data.items);
        setCustomerName(data.customer_name);
      });
  }, [id]);

  if (!sale) {
    return (
      <MainLayout>
        <div style={{ padding: 40 }}>
          <h2>Loading...</h2>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div
        style={{
          maxWidth: "1200px",
          margin: "30px auto",
          background: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 3px 10px rgba(0,0,0,.15)",
        }}
      >
        <h1>🧾 Sale Invoice</h1>

        <hr />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <div>
            <b>Customer</b>
            <br />
            {customerName}
          </div>

          <div>
            <b>Invoice No.</b>
            <br />
            {sale.invoice_number || "-"}
          </div>

          <div>
            <b>Date</b>
            <br />
            {sale.invoice_date}
          </div>

          <div>
            <b>Grand Total</b>
            <br />
            ₹{Number(sale.grand_total).toFixed(2)}
          </div>
        </div>

        <h2 style={{ marginTop: "35px" }}>Products</h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead
            style={{
              background: "#1976d2",
              color: "white",
            }}
          >
            <tr>
              <th style={{ padding: 10 }}>Product</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Disc %</th>
              <th>Disc ₹</th>
              <th>GST</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td style={{ padding: 10 }}>
                  {item.product_name}
                </td>

                <td align="center">
                  {item.quantity}
                </td>

                <td align="center">
                  ₹{item.rate}
                </td>

                <td align="center">
                  {item.discount_percent}
                </td>

                <td align="center">
                  ₹{item.discount_amount}
                </td>

                <td align="center">
                  {item.gst}%
                </td>

                <td align="center">
                  ₹{Number(item.amount).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          style={{
            width: "320px",
            marginLeft: "auto",
            marginTop: "30px",
          }}
        >
          <table style={{ width: "100%" }}>
            <tbody>
              <tr>
                <td>Subtotal</td>
                <td align="right">
                  ₹{Number(sale.subtotal).toFixed(2)}
                </td>
              </tr>

              <tr>
                <td>GST</td>
                <td align="right">
                  ₹{Number(sale.gst).toFixed(2)}
                </td>
              </tr>

              <tr
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  color: "#1976d2",
                }}
              >
                <td>Grand Total</td>

                <td align="right">
                  ₹{Number(sale.grand_total).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          style={{
            marginTop: "30px",
            display: "flex",
            gap: "15px",
          }}
        >
          <button
            onClick={() => window.print()}
            style={{
              background: "#2e7d32",
              color: "white",
              border: "none",
              padding: "12px 25px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            🖨 Print
          </button>

          <button
            onClick={() => navigate("/sales")}
            style={{
              background: "#1976d2",
              color: "white",
              border: "none",
              padding: "12px 25px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            ← Back
          </button>
        </div>
      </div>
    </MainLayout>
  );
}

export default ViewSale;