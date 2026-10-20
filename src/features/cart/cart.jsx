import { useContext, useEffect } from "react";
import "./cart.css";
import { CartProvider } from "../../shared/contexts/cartContext";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postOrder, generatePayment } from "../../shared/services/orders";

export default function Cart() {
  const { cart, dispatch } = useContext(CartProvider);
  const { isLoggedin, user } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const addItem = (index) => {
    dispatch({ type: "Increment Qty", payload: { index } });
  };

  const removeItem = (index) => {
    dispatch({ type: "Remove from Cart", payload: { index } });
  };

  const orderNow = async () => {
    if (!isLoggedin) {
      navigate("/login");
      return;
    }

    const totalAmount = cart.totalCartValue + 40;

    // Map cart items to the API's expected shape
    const productDetails = cart.cartItem.map((item) => ({
      itemName: item.name,
      quantity: item.quantity || item.qty || 1,
      price: Number(item.price) || 0,
    }));

    const orderPayload = {
      userId: user,
      productDetails,
      totalAmount,
      status: "pending",
      paymentId: '',
    };

    try {
      // Step 1: Generate a payment ID for this amount
      const paymentResponse = await generatePayment(totalAmount);
      console.log("Payment generated:", paymentResponse);
      const paymentId = paymentResponse?.paymentId;
      orderPayload.paymentId = paymentId;

      // Step 2: Create the order
      const orderResponse = await postOrder(orderPayload);
      console.log("Order placed:", orderResponse);
      const userId = orderResponse?.userId;

      // Step 3: Mark departure time — so the inactivity timer is
      // paused while the user is on the external payment page.
      // On return (app reload), authSlice will compensate loginTime.
      sessionStorage.setItem("paymentRedirectAt", Date.now().toString());

      // Step 4: Redirect to payment gateway
      window.location.href = `https://payment-gate-way-murex.vercel.app/payment?paymentId=${paymentId}&userId=${userId}&amount=${totalAmount}`;
    } catch (error) {
      console.error("Checkout failed:", error);
      alert(error?.message || "Failed to proceed. Please try again.");
    }
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
                  <button onClick={() => addItem(index)}>+</button>
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
