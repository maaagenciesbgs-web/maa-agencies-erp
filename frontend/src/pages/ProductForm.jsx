import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

function ProductForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const editingProduct = location.state?.product;

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    brand: "",
    purchase_price: "",
    selling_price: "",
    stock: "",
    gst: "",
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        category: editingProduct.category,
        brand: editingProduct.brand,
        purchase_price: editingProduct.purchase_price,
        selling_price: editingProduct.selling_price,
        stock: editingProduct.stock,
        gst: editingProduct.gst,
      });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const saveProduct = async (e) => {
    e.preventDefault();

    const productData = {
      ...formData,
      purchase_price: Number(formData.purchase_price),
      selling_price: Number(formData.selling_price),
      stock: Number(formData.stock),
      gst: Number(formData.gst),
    };

    let response;

    if (editingProduct) {
      response = await fetch(
        `http://127.0.0.1:8000/products/${editingProduct.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );
    } else {
      response = await fetch(
        "http://127.0.0.1:8000/products/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );
    }

    if (response.ok) {
      alert(
        editingProduct
          ? "Product Updated Successfully"
          : "Product Added Successfully"
      );

      navigate("/products");
    } else {
      alert("Error saving product");
    }
  };

  return (
    <MainLayout>
      <div
        style={{
          padding: "30px",
          maxWidth: "600px",
        }}
      >
        <h1>
          {editingProduct ? "✏️ Edit Product" : "➕ Add Product"}
        </h1>

        <form
          onSubmit={saveProduct}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          <input
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
          />

          <input
            name="brand"
            placeholder="Brand"
            value={formData.brand}
            onChange={handleChange}
          />

          <input
            type="number"
            name="purchase_price"
            placeholder="Purchase Price"
            value={formData.purchase_price}
            onChange={handleChange}
          />

          <input
            type="number"
            name="selling_price"
            placeholder="Selling Price"
            value={formData.selling_price}
            onChange={handleChange}
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
          />

          <input
            type="number"
            name="gst"
            placeholder="GST %"
            value={formData.gst}
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
            {editingProduct ? "Update Product" : "Save Product"}
          </button>
        </form>
      </div>
    </MainLayout>
  );
}

export default ProductForm;