import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
  { title: "Dashboard", icon: "🏠", path: "/" },

  { title: "Products", icon: "📦", path: "/products" },

  { title: "Customers", icon: "👥", path: "/customers" },

  { title: "Suppliers", icon: "🚚", path: "/suppliers" },

  {
    title: "New Purchase",
    icon: "🛒",
    path: "/purchases/add",
  },

  {
    title: "Purchase History",
    icon: "📋",
    path: "/purchase-history",
  },

  {
    title: "New Sale",
    icon: "🧾",
    path: "/sales/add",
  },

  {
    title: "Sales History",
    icon: "📋",
    path: "/sales",
  },

  {
    title: "Reports",
    icon: "📊",
    path: "/reports",
  },
];

  return (
    <div
      style={{
        width: "260px",
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        display: "flex",
        flexDirection: "column",
        boxShadow: "3px 0 12px rgba(0,0,0,.15)",
      }}
    >
      {/* Logo */}

      <div
        style={{
          padding: "28px 20px",
          textAlign: "center",
          borderBottom: "1px solid rgba(255,255,255,.08)",
        }}
      >
        <h1
          style={{
            margin: 0,
            color: "#38bdf8",
            fontSize: "30px",
            fontWeight: "700",
            letterSpacing: "1px",
          }}
        >
          Flowtica
        </h1>

        <p
          style={{
            marginTop: "6px",
            color: "#94a3b8",
            fontSize: "13px",
            letterSpacing: "2px",
          }}
        >
          BUSINESS ERP
        </p>
      </div>

      {/* Navigation */}

      <div
        style={{
          flex: 1,
          padding: "18px 12px",
        }}
      >
        {menuItems.map((item) => {
          const active =
            location.pathname === item.path ||
            (item.path !== "/" &&
              location.pathname.startsWith(item.path));

          return (
            <Link
              key={item.title}
              to={item.path}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "14px 18px",
                marginBottom: "8px",
                borderRadius: "12px",
                textDecoration: "none",
                color: active ? "#ffffff" : "#cbd5e1",
                background: active ? "#1976d2" : "transparent",
                fontWeight: active ? "600" : "400",
                transition: "all .25s ease",
              }}
            >
              <span style={{ fontSize: "20px" }}>
                {item.icon}
              </span>

              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>

      {/* Footer */}

      <div
        style={{
          padding: "18px",
          textAlign: "center",
          borderTop: "1px solid rgba(255,255,255,.08)",
        }}
      >
        <div
          style={{
            fontSize: "13px",
            color: "#94a3b8",
          }}
        >
          Flowtica ERP
        </div>

        <div
          style={{
            marginTop: "4px",
            fontSize: "11px",
            color: "#64748b",
          }}
        >
          Version 1.0
        </div>
      </div>
    </div>
  );
}

export default Sidebar;