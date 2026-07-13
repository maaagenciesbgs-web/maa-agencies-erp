import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

function Purchases() {
  const navigate = useNavigate();

  const [purchases, setPurchases] = useState([]);

  const loadPurchases = () => {
    fetch("http://127.0.0.1:8000/purchases/")
      .then((res) => res.json())
      .then((data) => setPurchases(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadPurchases();
  }, []);

  return (
    <MainLayout>
      <div
        style={{
          padding: "30px",
          background: "#f5f7fb",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h1>🛒 Purchases</h1>

          <button
            onClick={() => navigate("/purchases/add")}
            style={{
              background: "#1976d2",
              color: "white",
              border: "none",
              padding: "10px 18px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            ➕ New Purchase
          </button>
        </div>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
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
              <th style={{ padding: "12px" }}>Invoice No.</th>
              <th>Date</th>
              <th>Supplier ID</th>
              <th>Subtotal</th>
              <th>GST</th>
              <th>Grand Total</th>
            </tr>
          </thead>

          <tbody>
            {purchases.length > 0 ? (
              purchases.map((item) => (
                <tr key={item.id}>
                  <td style={{ padding: "12px" }}>{item.invoice_number}</td>
                  <td>{item.invoice_date}</td>
                  <td>{item.supplier_id}</td>
                  <td>₹{item.subtotal}</td>
                  <td>₹{item.gst}</td>
                  <td>₹{item.grand_total}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ padding: "25px", textAlign: "center" }}>
                  No Purchases Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
}

export default Purchases;