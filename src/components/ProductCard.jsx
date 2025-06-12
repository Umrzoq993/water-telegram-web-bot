const ProductCard = ({ item, onAdd, onRemove }) => (
  <div
    style={{
      border: "1px solid #ccc",
      borderRadius: "10px",
      padding: "10px",
      marginBottom: "10px",
    }}
  >
    <h3>{item.title}</h3>
    <p>{item.price.toLocaleString()} so‘m</p>
    <button onClick={() => onAdd(item)}>➕</button>
    <button onClick={() => onRemove(item)}>➖</button>
  </div>
);

export default ProductCard;
