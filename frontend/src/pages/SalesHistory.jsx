import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

function SalesHistory() {

  const [sales, setSales] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    loadSales();
  }, []);

  const loadSales = () => {
    fetch("http://127.0.0.1:8000/sales/")
      .then((res) => res.json())
      .then((data) => setSales(data));
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

        <h1>🧾 Sales History</h1>

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
              <th>Customer</th>
              <th>Subtotal</th>
              <th>GST</th>
              <th>Grand Total</th>
              <th style={{ width: "230px" }}>Actions</th>

            </tr>

          </thead>

          <tbody>

            {sales.length === 0 ? (

              <tr>

                <td
                  colSpan="8"
                  style={{
                    textAlign: "center",
                    padding: "30px",
                    color: "#777",
                  }}
                >
                  No Sales Found
                </td>

              </tr>

            ) : (

              sales.map((sale) => (

                <tr
                  key={sale.id}
                  style={{
                    borderBottom: "1px solid #eee",
                  }}
                >

                  <td style={{ padding: "12px" }}>
                    {sale.id}
                  </td>

                  <td>{sale.invoice_number}</td>

                  <td>{sale.invoice_date}</td>

                  <td>{sale.customer_id}</td>

                  <td>
                    ₹{Number(sale.subtotal).toFixed(2)}
                  </td>

                  <td>
                    ₹{Number(sale.gst).toFixed(2)}
                  </td>

                  <td>
                    <b>
                      ₹{Number(sale.grand_total).toFixed(2)}
                    </b>
                  </td>

                  <td>

                    <button
  onClick={() =>
    navigate(`/invoice/${sale.id}`)
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
                        navigate(`/sales/edit/${sale.id}`)
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
                      onClick={async () => {

                        const ok = window.confirm(
                          "Are you sure you want to delete this sale?"
                        );

                        if (!ok) return;

                        try {

                          const response = await fetch(
                            `http://127.0.0.1:8000/sales/${sale.id}`,
                            {
                              method: "DELETE",
                            }
                          );

                          if (response.ok) {

                            alert("Sale Deleted Successfully");

                            loadSales();

                          } else {

                            alert("Failed to delete sale");

                          }

                        } catch (err) {

                          console.log(err);

                          alert("Server Error");

                        }

                      }}
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

export default SalesHistory;