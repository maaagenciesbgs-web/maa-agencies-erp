import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

function Suppliers() {
  const navigate = useNavigate();

  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState("");

  const loadSuppliers = () => {
    fetch("http://127.0.0.1:8000/suppliers/")
      .then((res) => res.json())
      .then((data) => setSuppliers(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadSuppliers();
  }, []);

  const filteredSuppliers = suppliers.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.mobile.includes(search)
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
          <h1>🚚 Suppliers</h1>

          <div
            style={{
              background: "#1976d2",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          >
            Total Suppliers: {filteredSuppliers.length}
          </div>
        </div>

        <input
          type="text"
          placeholder="🔍 Search Supplier..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "300px",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        />

        <div style={{ marginBottom: "20px" }}>
          <button
            onClick={() => navigate("/suppliers/add")}
            style={{
              background: "#1976d2",
              color: "white",
              border: "none",
              padding: "10px 15px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            ➕ Add Supplier
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
              <th>Mobile</th>
              <th>Email</th>
              <th>City</th>
              <th>Opening Balance</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredSuppliers.length > 0 ? (
              filteredSuppliers.map((item) => (
                <tr key={item.id}>
                  <td style={{ padding: "15px" }}>{item.name}</td>
                  <td>{item.mobile}</td>
                  <td>{item.email}</td>
                  <td>{item.city}</td>
                  <td>₹{item.opening_balance}</td>

                  <td style={{ textAlign: "center" }}>
                    <button
                      onClick={() =>
                        navigate("/suppliers/add", {
                          state: { supplier: item },
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
                          `http://127.0.0.1:8000/suppliers/${item.id}`,
                          {
                            method: "DELETE",
                          }
                        );

                        if (response.ok) {
                          alert("Supplier Deleted Successfully");
                          loadSuppliers();
                        } else {
                          alert("Delete Failed");
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
                  No Suppliers Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
}

export default Suppliers;