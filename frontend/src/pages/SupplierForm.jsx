import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

function SupplierForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const editingSupplier = location.state?.supplier;

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
    if (editingSupplier) {
      setFormData({
        name: editingSupplier.name,
        mobile: editingSupplier.mobile,
        email: editingSupplier.email,
        gst_number: editingSupplier.gst_number,
        address: editingSupplier.address,
        city: editingSupplier.city,
        state: editingSupplier.state,
        opening_balance: editingSupplier.opening_balance,
      });
    }
  }, [editingSupplier]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const saveSupplier = async (e) => {
    e.preventDefault();

    const supplierData = {
      ...formData,
      opening_balance: Number(formData.opening_balance),
    };

    let response;

    if (editingSupplier) {
      response = await fetch(
        `http://127.0.0.1:8000/suppliers/${editingSupplier.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(supplierData),
        }
      );
    } else {
      response = await fetch(
        "http://127.0.0.1:8000/suppliers/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(supplierData),
        }
      );
    }

    if (response.ok) {
      alert(
        editingSupplier
          ? "Supplier Updated Successfully"
          : "Supplier Added Successfully"
      );

      navigate("/suppliers");
    } else {
      alert("Error saving supplier");
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
          {editingSupplier ? "✏️ Edit Supplier" : "➕ Add Supplier"}
        </h1>

        <form
          onSubmit={saveSupplier}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          <input
            name="name"
            placeholder="Supplier Name"
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
            {editingSupplier ? "Update Supplier" : "Save Supplier"}
          </button>
        </form>
      </div>
    </MainLayout>
  );
}

export default SupplierForm;