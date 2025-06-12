const Cart = ({ cartItems }) => (
  <div style={{ marginBottom: "20px" }}>
    <h4>Savat:</h4>
    {cartItems.length === 0
      ? "Bo‘sh"
      : cartItems.map((item) => (
          <div key={item.id}>
            {item.title} × {item.quantity}
          </div>
        ))}
  </div>
);

export default Cart;
