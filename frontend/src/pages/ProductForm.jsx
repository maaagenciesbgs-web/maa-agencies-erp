import { useState } from "react";

function ProductForm() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    brand: "",
    purchase_price: "",
    selling_price: "",
    stock: "",
    gst: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const saveProduct = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/products/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        purchase_price: Number(formData.purchase_price),
        selling_price: Number(formData.selling_price),
        stock: Number(formData.stock),
        gst: Number(formData.gst),
      }),
    });

    if (response.ok) {
      alert("Product Added Successfully!");

      setFormData({
        name: "",
        category: "",
        brand: "",
        purchase_price: "",
        selling_price: "",
        stock: "",
        gst: "",
      });
    } else {
      alert("Error adding product");
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "700px",
        margin: "auto",
      }}
    >
      <h1>➕ Add Product</h1>

      <form onSubmit={saveProduct}>
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
          name="purchase_price"
          placeholder="Purchase Price"
          value={formData.purchase_price}
          onChange={handleChange}
        />

        <input
          name="selling_price"
          placeholder="Selling Price"
          value={formData.selling_price}
          onChange={handleChange}
        />

        <input
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
        />

        <input
          name="gst"
          placeholder="GST %"
          value={formData.gst}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">Save Product</button>
      </form>
    </div>
  );
}

export default ProductForm;