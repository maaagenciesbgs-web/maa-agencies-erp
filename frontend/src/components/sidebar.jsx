function Sidebar() {
  return (
    <aside
      style={{
        width: "240px",
        background: "#1e293b",
        color: "white",
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      <h2>Maa Agencies</h2>

      <hr style={{ margin: "20px 0", borderColor: "#475569" }} />

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <div>📊 Dashboard</div>
        <div>📦 Products</div>
        <div>🛒 Sales</div>
        <div>👥 Customers</div>
        <div>📈 Reports</div>
        <div>⚙️ Settings</div>
      </div>
    </aside>
  );
}

export default Sidebar;