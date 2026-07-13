import { useState } from "react";

function CustomerPopup({ open, onClose, onSaved }) {
  const [customer, setCustomer] = useState({
    name: "",
    mobile: "",
    email: "",
    gst_number: "",
    address: "",
    city: "",
    state: "",
    opening_balance: 0,
  });

  if (!open) return null;

  const saveCustomer = async () => {
    if (!customer.name.trim()) {
      alert("Customer name is required");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/customers/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      });

      const result = await response.json();

      console.log(result);

      if (!response.ok) {
        alert(result.detail || "Unable to save customer");
        return;
      }

      onSaved(result.customer);

      setCustomer({
        name: "",
        mobile: "",
        email: "",
        gst_number: "",
        address: "",
        city: "",
        state: "",
        opening_balance: 0,
      });

      onClose();

    } catch (err) {
      console.log(err);
      alert("Server Error");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 5000,
      }}
    >
      <div
        style={{
          width: "450px",
          background: "white",
          padding: "25px",
          borderRadius: "10px",
        }}
      >
        <h2>➕ Add New Customer</h2>

        <input
          name="name"
          placeholder="Customer Name"
          value={customer.name}
          onChange={(e) =>
            setCustomer({ ...customer, name: e.target.value })
          }
          style={{ width: "100%", padding: "10px", marginTop: "15px" }}
        />

        <input
          name="mobile"
          placeholder="Mobile"
          value={customer.mobile}
          onChange={(e) =>
            setCustomer({ ...customer, mobile: e.target.value })
          }
          style={{ width: "100%", padding: "10px", marginTop: "12px" }}
        />

        <input
          name="email"
          placeholder="Email"
          value={customer.email}
          onChange={(e) =>
            setCustomer({ ...customer, email: e.target.value })
          }
          style={{ width: "100%", padding: "10px", marginTop: "12px" }}
        />

        <input
          name="gst_number"
          placeholder="GST Number"
          value={customer.gst_number}
          onChange={(e) =>
            setCustomer({ ...customer, gst_number: e.target.value })
          }
          style={{ width: "100%", padding: "10px", marginTop: "12px" }}
        />

        <textarea
          name="address"
          placeholder="Address"
          value={customer.address}
          onChange={(e) =>
            setCustomer({ ...customer, address: e.target.value })
          }
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "12px",
            height: "80px",
          }}
        />

        <input
          name="city"
          placeholder="City"
          value={customer.city}
          onChange={(e) =>
            setCustomer({ ...customer, city: e.target.value })
          }
          style={{ width: "100%", padding: "10px", marginTop: "12px" }}
        />

        <input
          name="state"
          placeholder="State"
          value={customer.state}
          onChange={(e) =>
            setCustomer({ ...customer, state: e.target.value })
          }
          style={{ width: "100%", padding: "10px", marginTop: "12px" }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <button onClick={onClose}>Cancel</button>

          <button
            onClick={saveCustomer}
            style={{
              background: "#1976d2",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomerPopup;