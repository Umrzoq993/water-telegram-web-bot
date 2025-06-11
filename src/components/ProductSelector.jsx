import React, { useEffect, useState } from "react";

const products = [
  { id: 1, name: "5L Baklashka", price: 10000 },
  { id: 2, name: "10L Baklashka", price: 18000 },
  { id: 3, name: "20L Baklashka", price: 25000 },
];

const ProductSelector = () => {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const tg = window.Telegram.WebApp;

    if (!tg) {
      console.log("❌ Telegram WebApp mavjud emas.");
      return;
    }

    tg.ready(); // 🔑 eng muhim qadam – Web App ni ishga tayyorlash

    const onSend = () => {
      if (selected) {
        console.log("📤 Tugma bosildi!");
        tg.sendData(JSON.stringify(selected));
      }
    };

    tg.onEvent("mainButtonClicked", onSend); // ✅ Main Button listener

    if (selected) {
      tg.MainButton.setText("Buyurtmani yuborish");
      tg.MainButton.show();
    } else {
      tg.MainButton.hide();
    }

    return () => {
      tg.offEvent("mainButtonClicked", onSend);
    };
  }, [selected]);

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
