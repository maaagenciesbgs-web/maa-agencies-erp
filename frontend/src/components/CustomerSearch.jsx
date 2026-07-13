import { useEffect, useState } from "react";
import CustomerPopup from "./CustomerPopup";

function CustomerSearch({ value, onSelect }) {
  const [customers, setCustomers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState(value || "");
  const [show, setShow] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  const loadCustomers = () => {
    fetch("http://127.0.0.1:8000/customers/")
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data);
        setFiltered(data);
      });
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  useEffect(() => {
    setSearch(value || "");
  }, [value]);

  const handleSearch = (text) => {
    setSearch(text);

    const result = customers.filter((c) =>
      c.name.toLowerCase().includes(text.toLowerCase()) ||
      (c.mobile || "").includes(text)
    );

    setFiltered(result);
    setShow(true);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
      }}
    >
      <input
        type="text"
        placeholder="Search Customer..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={() => setShow(true)}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      {show && (
        <div
          style={{
            position: "absolute",
            background: "white",
            width: "100%",
            maxHeight: "220px",
            overflowY: "auto",
            border: "1px solid #ddd",
            zIndex: 999,
            boxShadow: "0 4px 12px rgba(0,0,0,.15)",
          }}
        >
          {filtered.length > 0 ? (
            filtered.map((customer) => (
              <div
                key={customer.id}
                onClick={() => {
                  setSearch(customer.name);
                  setShow(false);
                  onSelect(customer);
                }}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                }}
              >
                <b>{customer.name}</b>
                <br />
                <small>{customer.mobile}</small>
              </div>
            ))
          ) : (
            <div
              style={{
                padding: "12px",
              }}
            >
              <div>No customer found</div>

              <button
                onClick={() => setPopupOpen(true)}
                style={{
                  marginTop: "10px",
                  width: "100%",
                  padding: "10px",
                  background: "#1976d2",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                ➕ Add New Customer
              </button>
            </div>
          )}
        </div>
      )}

      <CustomerPopup
        open={popupOpen}
        onClose={() => {
          setPopupOpen(false);
          setShow(false);
        }}
        onSaved={(customer) => {
          loadCustomers();

          setSearch(customer.name);

          onSelect(customer);

          setPopupOpen(false);
          setShow(false);
        }}
      />
    </div>
  );
}

export default CustomerSearch;