import { useContext, useEffect } from "react";
import "./cart.css";
import { CartProvider } from "../../shared/contexts/cartContext";

export default function Cart() {
  const { cart, dispatch } = useContext(CartProvider);

  const addItem = (item) => {
    dispatch({ type: "Add to Cart", payload: item });
  };

  const removeItem = (index) => {
    dispatch({ type: "Remove from Cart", payload: { index } });
  };
  useEffect(() => {
    console.log(cart);
  }, [cart]);
  return (
    <div className="cart-page">
      {/* <h2>My Cart</h2>   */}
      <div className="cart-layout">
        {cart.cartSize === 0 && <h2>Oops cart is empty add items</h2>}
        <div className="cart-items">
          {cart?.cartItem.map((item, index) => (
            <div className="cart-card" key={index}>
              <img src={item.image} alt={item.name} />

              <div className="cart-content">
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
                <button onClick={() => removeItem(index)}>-</button>
                <span>Qty: {item.qty} 1</span>
                <button onClick={() => addItem(item)}>+</button>
              </div>
            </div>
          ))}
        </div>
        {cart.cartSize > 0 && (
          <div className="summary">
            <h3>Order Summary</h3>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{cart.totalCartValue}</span>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <span>₹40</span>
            </div>

            <div className="summary-row total">
              <span>Total</span>
              <span>₹{cart.totalCartValue + 40}</span>
            </div>

            <button>Proceed To Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
}
