import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

function CustomerForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const editingCustomer = location.state?.customer;

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    gst_number: "",
    address: "",
    city: "",
    state: "",
    opening_balance: "",
  });

  useEffect(() => {
    if (editingCustomer) {
      setFormData({
        name: editingCustomer.name,
        mobile: editingCustomer.mobile,
        email: editingCustomer.email,
        gst_number: editingCustomer.gst_number,
        address: editingCustomer.address,
        city: editingCustomer.city,
        state: editingCustomer.state,
        opening_balance: editingCustomer.opening_balance,
      });
    }
  }, [editingCustomer]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const saveCustomer = async (e) => {
    e.preventDefault();

    const customerData = {
      ...formData,
      opening_balance: Number(formData.opening_balance),
    };

    let response;

    if (editingCustomer) {
      response = await fetch(
        `http://127.0.0.1:8000/customers/${editingCustomer.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(customerData),
        }
      );
    } else {
      response = await fetch(
        "http://127.0.0.1:8000/customers/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(customerData),
        }
      );
    }

    if (response.ok) {
      alert(
        editingCustomer
          ? "Customer Updated Successfully"
          : "Customer Added Successfully"
      );

      navigate("/customers");
    } else {
      alert("Error saving customer");
    }
  };

  return (
    <MainLayout>
      <div
        style={{
          padding: "30px",
          maxWidth: "700px",
        }}
      >
        <h1>
          {editingCustomer ? "✏️ Edit Customer" : "➕ Add Customer"}
        </h1>

        <form
          onSubmit={saveCustomer}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          <input
            name="name"
            placeholder="Customer Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            name="gst_number"
            placeholder="GST Number"
            value={formData.gst_number}
            onChange={handleChange}
          />

          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
          />

          <input
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
          />

          <input
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
          />

          <input
            type="number"
            name="opening_balance"
            placeholder="Opening Balance"
            value={formData.opening_balance}
            onChange={handleChange}
          />

          <button
            type="submit"
            style={{
              background: "#1976d2",
              color: "white",
              border: "none",
              padding: "12px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            {editingCustomer ? "Update Customer" : "Save Customer"}
          </button>
        </form>
      </div>
    </MainLayout>
  );
}

export default CustomerForm;