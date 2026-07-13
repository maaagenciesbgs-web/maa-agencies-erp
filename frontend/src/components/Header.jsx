function Header() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header
      style={{
        height: "70px",
        background: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <div>
        <h2
          style={{
            margin: 0,
            color: "#1976d2",
            fontSize: "24px",
          }}
        >
          🚀 Flowtica ERP
        </h2>

        <p
          style={{
            margin: "4px 0 0",
            color: "#666",
            fontSize: "14px",
          }}
        >
          {today}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <span
          style={{
            fontSize: "22px",
            cursor: "pointer",
          }}
        >
          🔔
        </span>

        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            background: "#1976d2",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          A
        </div>
      </div>
    </header>
  );
}

export default Header;