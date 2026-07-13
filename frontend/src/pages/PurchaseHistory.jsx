import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

function PurchaseHistory() {
  const [purchases, setPurchases] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    loadPurchases();
  }, []);

  const loadPurchases = () => {
    fetch("http://127.0.0.1:8000/purchases/")
      .then((res) => res.json())
      .then((data) => setPurchases(data));
  };

  const deletePurchase = async (id) => {
    const ok = window.confirm(
      "Are you sure you want to delete this purchase?"
    );

    if (!ok) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/purchases/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Purchase Deleted Successfully");
        loadPurchases();
      } else {
        alert("Failed to delete purchase");
      }
    } catch (err) {
      console.log(err);
      alert("Server Error");
    }
  };

  return (
    <MainLayout>
      <div
        style={{
          padding: "30px",
          maxWidth: "1300px",
          margin: "auto",
        }}
      >
        <h1>🛒 Purchase History</h1>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "25px",
            background: "white",
            boxShadow: "0 2px 10px rgba(0,0,0,.1)",
          }}
        >
          <thead
            style={{
              background: "#1976d2",
              color: "white",
            }}
          >
            <tr>
              <th style={{ padding: "12px" }}>ID</th>
              <th>Invoice</th>
              <th>Date</th>
              <th>Supplier</th>
              <th>Subtotal</th>
              <th>GST</th>
              <th>Grand Total</th>
              <th style={{ width: "240px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {purchases.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  style={{
                    textAlign: "center",
                    padding: "30px",
                    color: "#777",
                  }}
                >
                  No Purchases Found
                </td>
              </tr>
            ) : (
              purchases.map((purchase) => (
                <tr
                  key={purchase.id}
                  style={{
                    borderBottom: "1px solid #eee",
                  }}
                >
                  <td style={{ padding: "12px" }}>
                    {purchase.id}
                  </td>

                  <td>{purchase.invoice_number}</td>

                  <td>{purchase.invoice_date}</td>

                  <td>{purchase.supplier_id}</td>

                  <td>
                    ₹{Number(purchase.subtotal).toFixed(2)}
                  </td>

                  <td>
                    ₹{Number(purchase.gst).toFixed(2)}
                  </td>

                  <td>
                    <b>
                      ₹{Number(purchase.grand_total).toFixed(2)}
                    </b>
                  </td>

                  <td>
                    <button
                      onClick={() =>
                        navigate(`/purchases/view/${purchase.id}`)
                      }
                      style={{
                        background: "#1976d2",
                        color: "white",
                        border: "none",
                        padding: "7px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        marginRight: "6px",
                      }}
                    >
                      👁 View
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/purchases/edit/${purchase.id}`)
                      }
                      style={{
                        background: "#f59e0b",
                        color: "white",
                        border: "none",
                        padding: "7px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        marginRight: "6px",
                      }}
                    >
                      ✏ Edit
                    </button>

                    <button
                      onClick={() => deletePurchase(purchase.id)}
                      style={{
                        background: "#dc2626",
                        color: "white",
                        border: "none",
                        padding: "7px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
}

export default PurchaseHistory;