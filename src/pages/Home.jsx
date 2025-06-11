import React, { useEffect } from "react";
import ProductSelector from "../components/ProductSelector";

const Home = () => {
  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.expand(); // Butun ekran bo‘lishi uchun
    tg.MainButton.setText("Buyurtmani Yuborish");
    tg.MainButton.hide();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>🚰 Suv Buyurtmasi</h2>
      <ProductSelector />
    </div>
  );
};

export default Home;
