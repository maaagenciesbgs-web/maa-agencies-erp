import MainLayout from "../layouts/MainLayout";

function Dashboard() {
  return (
    <MainLayout>
      <div
        style={{
          padding: "30px",
          background: "#f5f5f5",
          minHeight: "100%",
          fontFamily: "Arial",
        }}
      >
        <h1>Maa Agencies ERP</h1>

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "30px",
            flexWrap: "wrap",
          }}
        >
          {[
            ["📦 Products", "1000"],
            ["🛒 Sales Today", "₹0"],
            ["👥 Customers", "0"],
            ["⚠️ Low Stock", "0"],
          ].map((item) => (
            <div
              key={item[0]}
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "12px",
                width: "220px",
                boxShadow: "0 2px 10px rgba(0,0,0,.1)",
              }}
            >
              <h3>{item[0]}</h3>
              <h2>{item[1]}</h2>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "30px",
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,.1)",
          }}
        >
          <h2>Quick Actions</h2>

          <button>➕ Add Product</button>

          <button style={{ marginLeft: "10px" }}>
            🧾 New Sale
          </button>

          <button style={{ marginLeft: "10px" }}>
            👤 Customer Ledger
          </button>
        </div>
      </div>
    </MainLayout>
  );
}

export default Dashboard;