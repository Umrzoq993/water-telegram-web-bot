import React, { useEffect, useState, useCallback } from "react";

const products = [
  { id: 1, name: "5L Baklashka", price: 10000 },
  { id: 2, name: "10L Baklashka", price: 18000 },
  { id: 3, name: "20L Baklashka", price: 25000 },
];

const telegram = window.Telegram.WebApp;

const ProductSelector = () => {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    telegram.ready(); // faollashtirish
  }, []);

  useEffect(() => {
    if (selected) {
      telegram.MainButton.setText("Buyurtmani yuborish");
      telegram.MainButton.show();
    } else {
      telegram.MainButton.hide();
    }
  }, [selected]);

  const onSendData = useCallback(() => {
    console.log("📤 Tugma bosildi!");
    if (selected) {
      telegram.sendData(JSON.stringify(selected));
    }
  }, [selected]);

  useEffect(() => {
    telegram.onEvent("mainButtonClicked", onSendData);
    return () => telegram.offEvent("mainButtonClicked", onSendData);
  }, [onSendData]);

  return (
    <div>
      <p>Baklashka tanlang:</p>
      {products.map((p) => (
        <button
          key={p.id}
          onClick={() => setSelected(p)}
          style={{
            display: "block",
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            backgroundColor: selected?.id === p.id ? "#58a" : "#eee",
            color: selected?.id === p.id ? "#fff" : "#000",
            border: "1px solid #ccc",
            borderRadius: "8px",
            textAlign: "left",
          }}
        >
          {p.name} – {p.price.toLocaleString()} so‘m
        </button>
      ))}
    </div>
  );
};

export default ProductSelector;
