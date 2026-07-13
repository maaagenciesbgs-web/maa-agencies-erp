import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import StatCard from "../components/StatCard";

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    products: 0,
    customers: 0,
    suppliers: 0,
    sales_today: 0,
    low_stock: 0,
  });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/dashboard")
      .then((res) => res.json())
      .then((data) => setDashboard(data))
      .catch((err) => console.log(err));
  }, []);

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
        <h1
          style={{
            marginBottom: "5px",
            color: "#1976d2",
          }}
        >
          🚀 Flowtica ERP
        </h1>

        <p
          style={{
            color: "#666",
            marginBottom: "35px",
            fontSize: "18px",
          }}
        >
          Business Management System
        </p>

        {/* Dashboard Cards */}

        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            marginBottom: "35px",
          }}
        >
          <StatCard
            icon="📦"
            title="Products"
            value={dashboard.products}
            color="#1976d2"
          />

          <StatCard
            icon="👥"
            title="Customers"
            value={dashboard.customers}
            color="#2e7d32"
          />

          <StatCard
            icon="🚚"
            title="Suppliers"
            value={dashboard.suppliers}
            color="#ff9800"
          />

          <StatCard
            icon="🛒"
            title="Sales Today"
            value={`₹${dashboard.sales_today}`}
            color="#7b1fa2"
          />

          <StatCard
            icon="⚠️"
            title="Low Stock"
            value={dashboard.low_stock}
            color={dashboard.low_stock > 0 ? "#d32f2f" : "#388e3c"}
          />
        </div>

        {/* Quick Actions */}

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 3px 10px rgba(0,0,0,.1)",
            marginBottom: "30px",
          }}
        >
          <h2>Quick Actions</h2>

          <div
            style={{
              marginTop: "20px",
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
            }}
          >
            <button
              style={{
                padding: "12px 20px",
                background: "#1976d2",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              ➕ Add Product
            </button>

            <button
              style={{
                padding: "12px 20px",
                background: "#2e7d32",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              🧾 New Sale
            </button>

            <button
              style={{
                padding: "12px 20px",
                background: "#ff9800",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              👤 Customer Ledger
            </button>

            <button
              style={{
                padding: "12px 20px",
                background: "#6a1b9a",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              🚚 Add Supplier
            </button>
          </div>
        </div>

        {/* Recent Activity */}

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 3px 10px rgba(0,0,0,.1)",
          }}
        >
          <h2>Recent Activity</h2>

          <p
            style={{
              marginTop: "15px",
              color: "#777",
            }}
          >
            No recent activity available.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}

export default Dashboard;