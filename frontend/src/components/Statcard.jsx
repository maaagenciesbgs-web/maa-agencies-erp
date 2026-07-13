function StatCard({ icon, title, value, color = "#1976d2" }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "14px",
        padding: "24px",
        minWidth: "220px",
        flex: 1,
        boxShadow: "0 8px 20px rgba(0,0,0,.08)",
        borderLeft: `6px solid ${color}`,
        transition: "0.3s",
      }}
    >
      <div
        style={{
          fontSize: "34px",
          marginBottom: "10px",
        }}
      >
        {icon}
      </div>

      <div
        style={{
          color: "#666",
          fontSize: "15px",
        }}
      >
        {title}
      </div>

      <h1
        style={{
          marginTop: "10px",
          color: color,
          fontSize: "34px",
        }}
      >
        {value}
      </h1>
    </div>
  );
}

export default StatCard;