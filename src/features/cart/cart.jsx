import { useContext, useEffect } from "react";
import "./cart.css";
import { CartProvider } from "../../shared/contexts/cartContext";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, dispatch } = useContext(CartProvider);
  const {isLoggedin} = useSelector(state => state.auth);
  const navigate = useNavigate();

  const addItem = (item) => {
    dispatch({ type: "Add to Cart", payload: { item, restaurant: cart.currentRestarunt } });
    dispatch({ type: "total cart value" });
  };

  const removeItem = (index) => {
    dispatch({ type: "Remove from Cart", payload: { index } });
    dispatch({ type: "total cart value" });
  };

  const orderNow = ()=>{
    if(isLoggedin){
      let amount = cart.totalCartValue + 40;
      let orderId = 200789876;
      let url = 'https://payment-gate-way-murex.vercel.app/'
      window.location.href =
    `https://payment-gate-way-murex.vercel.app/payment?orderId=${orderId}&amount=${amount}`;
    }else{
      navigate("/login");
    }
  }
  useEffect(() => {
    console.log(cart);
  }, [cart]);
  return (
    <div className="cart-page">
      {/* <h2>My Cart</h2>   */}
      <div className="cart-layout">
        {cart.cartSize === 0 && <h2>Oops cart is empty add items</h2>}
        <div className="cart-items">
          {cart?.cartItem.map((item, index) => {
            const quantity = item.quantity || item.qty || 1;
            const price = Number(item.price) || 0;
            return (
              <div className="cart-card" key={item._id || item.id || index}>
                <img src={item.image} alt={item.name} />

                <div className="cart-content">
                  <h3>{item.name}</h3>
                  <p>₹{price * quantity}</p>
                  <button onClick={() => removeItem(index)}>-</button>
                  <span>Qty: {quantity}</span>
                  <button onClick={() => addItem(item)}>+</button>
                </div>
              </div>
            );
          })}
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

            <button onClick={orderNow}>Proceed To Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
}
