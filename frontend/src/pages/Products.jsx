import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [excelFile, setExcelFile] = useState(null);

  const loadProducts = () => {
    fetch("http://127.0.0.1:8000/products/")
      .then((res) => res.json())
      .then((data) => {
  console.log("Products API:", data);
  setProducts(data);
})
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const importExcel = async () => {
    if (!excelFile) {
      alert("Please select an Excel file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", excelFile);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/products/import",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        alert("Products imported successfully!");
        loadProducts();
        setExcelFile(null);
      } else {
        alert("Import failed.");
      }
    } catch (err) {
      console.log(err);
      alert("Server Error");
    }
  };

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      <div
        style={{
          padding: "30px",
          background: "#f5f7fb",
          minHeight: "100vh",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px",
          }}
        >
          <h1>📦 Products</h1>

          <div
            style={{
              background: "#1976d2",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          >
            Total Products: {filteredProducts.length}
          </div>
        </div>

        <input
          type="text"
          placeholder="🔍 Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "300px",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        />

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={(e) => setExcelFile(e.target.files[0])}
          />

          <button
            onClick={importExcel}
            style={{
              background: "#2e7d32",
              color: "white",
              border: "none",
              padding: "10px 15px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            📥 Import Excel
          </button>

          <button
            onClick={() => navigate("/products/add")}
            style={{
              background: "#1976d2",
              color: "white",
              border: "none",
              padding: "10px 15px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            ➕ Add Product
          </button>
        </div>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
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
              <th style={{ padding: "15px" }}>Name</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Stock</th>
              <th>Selling Price</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <tr key={item.id}>
                  <td style={{ padding: "15px" }}>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.brand}</td>

                  <td
                    style={{
                      textAlign: "center",
                      color:
                        item.stock < 10 ? "#d32f2f" : "#2e7d32",
                      fontWeight: "bold",
                    }}
                  >
                    {item.stock}
                  </td>

                  <td style={{ textAlign: "center" }}>
                    ₹{item.selling_price}
                  </td>

                  <td style={{ textAlign: "center" }}>
                    <button
                      onClick={() =>
                        navigate("/products/add", {
                          state: { product: item },
                        })
                      }
                      style={{
                        background: "#1976d2",
                        color: "white",
                        border: "none",
                        padding: "8px 14px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        marginRight: "10px",
                      }}
                    >
                      ✏️ Edit
                    </button>

                    <button
                      onClick={async () => {
                        if (
                          !window.confirm(
                            `Delete "${item.name}"?`
                          )
                        )
                          return;

                        const response = await fetch(
                          `http://127.0.0.1:8000/products/${item.id}`,
                          {
                            method: "DELETE",
                          }
                        );

                        if (response.ok) {
                          loadProducts();
                        } else {
                          alert("Delete failed.");
                        }
                      }}
                      style={{
                        background: "#d32f2f",
                        color: "white",
                        border: "none",
                        padding: "8px 14px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  style={{
                    padding: "30px",
                    textAlign: "center",
                  }}
                >
                  No Products Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
}

export default Products;