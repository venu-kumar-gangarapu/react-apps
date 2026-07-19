import { useContext, useEffect } from "react";
import "./cart.css";
import { CartProvider } from "../../shared/contexts/cartContext";

export default function Cart() {
  const {cart} = useContext(CartProvider);
  useEffect(()=>{
    console.log(cart);
  },[cart])
  return (
    <div className="cart-page">
      {/* <h2>My Cart</h2>   */}

      <div className="cart-layout">
        <div className="cart-items">
          {cart?.cartItem.map((item) => (
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