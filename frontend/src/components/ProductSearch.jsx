import { useEffect, useState } from "react";

function ProductSearch({ value, onSelect }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(value || "");
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    setSearch(value || "");
  }, [value]);

  const filteredProducts = products
    .map((product) => {
      const query = search
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .filter(Boolean);

      const searchable = (
        product.name +
        " " +
        product.brand +
        " " +
        product.category +
        " " +
        (product.code || "") +
        " " +
        (product.barcode || "")
      ).toLowerCase();

      let score = 0;

      query.forEach((word) => {
        if (searchable.includes(word)) score += 10;

        if (product.name.toLowerCase().startsWith(word))
          score += 25;

        if (
          product.code &&
          product.code.toLowerCase().startsWith(word)
        )
          score += 40;
      });

      return {
        ...product,
        score,
      };
    })
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score);

  return (
    <div style={{ position: "relative", width: "350px" }}>
      <input
        type="text"
        placeholder="Search Name / Code / Brand..."
        value={search}
        onFocus={() => setShowList(true)}
        onChange={(e) => {
          setSearch(e.target.value);
          setShowList(true);
        }}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      {showList && search !== "" && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            maxHeight: "300px",
            overflowY: "auto",
            background: "white",
            border: "1px solid #ddd",
            boxShadow: "0 4px 12px rgba(0,0,0,.15)",
            zIndex: 999,
          }}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  setSearch(product.name);
                  setShowList(false);
                  onSelect(product);
                }}
                style={{
                  padding: "12px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                }}
              >
                <div style={{ fontWeight: "bold" }}>
                  {product.name}
                </div>

                <div
                  style={{
                    fontSize: "12px",
                    color: "#666",
                  }}
                >
                  {product.brand} | {product.category}
                </div>

                <div
                  style={{
                    fontSize: "12px",
                    color: "#1976d2",
                  }}
                >
                  Purchase ₹{product.purchase_price}
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                padding: "12px",
                color: "#777",
              }}
            >
              No matching products
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductSearch;