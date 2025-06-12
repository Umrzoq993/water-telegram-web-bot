import { useEffect, useState, useCallback } from "react";
import { getData } from "./constants/db";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";

const tg = window.Telegram.WebApp;
const App = () => {
  const [cart, setCart] = useState([]);
  const data = getData();

  useEffect(() => {
    tg.ready();
    tg.expand();
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      tg.MainButton.setText("Buyurtmani yuborish");
      tg.MainButton.show();
    } else {
      tg.MainButton.hide();
    }
  }, [cart]);

  const add = (item) => {
    const exist = cart.find((x) => x.id === item.id);
    if (exist) {
      setCart(
        cart.map((x) =>
          x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const remove = (item) => {
    const exist = cart.find((x) => x.id === item.id);
    if (!exist) return;
    if (exist.quantity === 1) {
      setCart(cart.filter((x) => x.id !== item.id));
    } else {
      setCart(
        cart.map((x) =>
          x.id === item.id ? { ...x, quantity: x.quantity - 1 } : x
        )
      );
    }
  };

  const onSendData = useCallback(() => {
    const queryID = tg.initDataUnsafe.query_id;

    if (!queryID) {
      tg.sendData(JSON.stringify(cart));
    } else {
      fetch("https://your-backend-url.com/web-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ queryID, data: cart }),
      });
    }
  }, [cart]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => tg.offEvent("mainButtonClicked", onSendData);
  }, [onSendData]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>🚰 Suv Buyurtmasi</h2>
      <Cart cartItems={cart} />
      {data.map((item) => (
        <ProductCard key={item.id} item={item} onAdd={add} onRemove={remove} />
      ))}
    </div>
  );
};

export default App;
