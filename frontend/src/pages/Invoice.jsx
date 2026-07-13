import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Invoice() {
  const { id } = useParams();

  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInvoice();
  }, []);

  const loadInvoice = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/sales/${id}`
      );

      const data = await res.json();

      setInvoice(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      alert("Unable to load invoice");
    }
  };

  if (loading) {
    return <h2 style={{ padding: 40 }}>Loading...</h2>;
  }

  const sale = invoice.sale;
  const items = invoice.items;

  return (
    <>
          <div
        style={{
          maxWidth: "900px",
          margin: "30px auto",
          padding: "30px",
          background: "#fff",
          border: "1px solid #ddd",
        }}
        id="invoice-print"
      >

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <button
            onClick={() => window.print()}
            style={{
              padding: "10px 20px",
              background: "#1976d2",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            🖨 Print Invoice
          </button>
        </div>

        <div
          style={{
            textAlign: "center",
            borderBottom: "2px solid #1976d2",
            paddingBottom: "20px",
            marginBottom: "25px",
          }}
        >
          <h1 style={{ margin: 0 }}>
            MAA AGENCIES
          </h1>

          <div>
            Chanakya Nagar, Begusarai, Bihar
          </div>

          <div>
            Wholesale & Retail | Plumbing | Sanitary | Paints
          </div>

          <div>
            GSTIN : 10ABUFM5379B1Z7
          </div>

          <div>
            Mobile : 9507701919
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "30px",
          }}
        >
          <div>
            <h3>Bill To</h3>

            <div>
              <b>{invoice.customer_name}</b>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div>
              <b>Invoice No :</b>{" "}
              {sale.invoice_number}
            </div>

            <div>
              <b>Date :</b>{" "}
              {sale.invoice_date}
            </div>
          </div>
        </div>
                <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#1976d2",
                color: "white",
              }}
            >
              <th style={{ border: "1px solid #ccc", padding: "10px" }}>
                #
              </th>

              <th
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  textAlign: "left",
                }}
              >
                Product
              </th>

              <th style={{ border: "1px solid #ccc", padding: "10px" }}>
                Qty
              </th>

              <th style={{ border: "1px solid #ccc", padding: "10px" }}>
                Rate
              </th>

              <th style={{ border: "1px solid #ccc", padding: "10px" }}>
                GST %
              </th>

              <th style={{ border: "1px solid #ccc", padding: "10px" }}>
                Amount
              </th>
            </tr>
          </thead>

          <tbody>

            {items.map((item, index) => (

              <tr key={item.id}>

                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {index + 1}
                </td>

                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                  }}
                >
                  {item.product_name}
                </td>

                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {item.quantity}
                </td>

                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "right",
                  }}
                >
                  ₹{Number(item.rate).toFixed(2)}
                </td>

                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {item.gst}%
                </td>

                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "right",
                  }}
                >
                  ₹{Number(item.amount).toFixed(2)}
                </td>

              </tr>

            ))}

          </tbody>

        </table>
                {/* ================= Totals ================= */}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "30px",
          }}
        >
          <table
            style={{
              width: "320px",
              borderCollapse: "collapse",
            }}
          >
            <tbody>

              <tr>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                  }}
                >
                  <b>Subtotal</b>
                </td>

                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    textAlign: "right",
                  }}
                >
                  ₹{Number(sale.subtotal).toFixed(2)}
                </td>
              </tr>

              <tr>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                  }}
                >
                  <b>GST</b>
                </td>

                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    textAlign: "right",
                  }}
                >
                  ₹{Number(sale.gst).toFixed(2)}
                </td>
              </tr>

              <tr
                style={{
                  background: "#1976d2",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                <td
                  style={{
                    padding: "12px",
                  }}
                >
                  Grand Total
                </td>

                <td
                  style={{
                    padding: "12px",
                    textAlign: "right",
                  }}
                >
                  ₹{Number(sale.grand_total).toFixed(2)}
                </td>
              </tr>

            </tbody>
          </table>
        </div>

        <div
          style={{
            marginTop: "60px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <b>Thank you for your business!</b>

            <div
              style={{
                marginTop: "10px",
                fontSize: "13px",
                color: "#666",
              }}
            >
              This is a computer generated invoice.
            </div>
          </div>

          <div
            style={{
              textAlign: "center",
              width: "220px",
            }}
          >
            <div
              style={{
                height: "60px",
              }}
            />

            <div
              style={{
                borderTop: "1px solid black",
                paddingTop: "8px",
                fontWeight: "bold",
              }}
            >
              Authorized Signature
            </div>
          </div>
        </div>

      </div>

    </>

  );

}

export default Invoice;