import { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        padding: "30px",
        background: "#f5f7fb",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          marginBottom: "20px",
          color: "#2c3e50",
        }}
      >
        📦 Products
      </h1>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "12px",
          width: "320px",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          outline: "none",
        }}
      />

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fff",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <thead
          style={{
            background: "#1976d2",
            color: "#fff",
          }}
        >
          <tr>
            <th style={{ padding: "15px", textAlign: "left" }}>Name</th>
            <th style={{ padding: "15px", textAlign: "left" }}>Category</th>
            <th style={{ padding: "15px", textAlign: "left" }}>Brand</th>
            <th style={{ padding: "15px", textAlign: "center" }}>Stock</th>
            <th style={{ padding: "15px", textAlign: "right" }}>
              Selling Price
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item, index) => (
              <tr
                key={index}
                style={{
                  borderBottom: "1px solid #eee",
                }}
              >
                <td style={{ padding: "15px" }}>{item.name}</td>
                <td style={{ padding: "15px" }}>{item.category}</td>
                <td style={{ padding: "15px" }}>{item.brand}</td>

                <td
                  style={{
                    padding: "15px",
                    textAlign: "center",
                    color: item.stock < 10 ? "red" : "green",
                    fontWeight: "bold",
                  }}
                >
                  {item.stock}
                </td>

                <td
                  style={{
                    padding: "15px",
                    textAlign: "right",
                    fontWeight: "bold",
                  }}
                >
                  ₹{item.selling_price}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                style={{
                  padding: "30px",
                  textAlign: "center",
                  color: "#888",
                }}
              >
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Products;