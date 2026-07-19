import "./cart.css";

const cartItems = [
  {
    id: 1,
    name: "Chicken Biryani",
    price: 299,
    qty: 1,
    image: "/assets/food/images1.jpg",
  },
  {
    id: 2,
    name: "Paneer Pizza",
    price: 399,
    qty: 1,
    image: "/assets/food/images5.jpg",
  },
];

export default function Cart() {
  return (
    <div className="cart-page">
      {/* <h2>My Cart</h2>   */}

      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-card" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-content">
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
                <span>Qty: {item.qty}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="summary">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹698</span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <span>₹40</span>
          </div>

          <div className="summary-row total">
            <span>Total</span>
            <span>₹738</span>
          </div>

          <button>Proceed To Checkout</button>
        </div>
      </div>
    </div>
  );
}