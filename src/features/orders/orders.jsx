import { useEffect, useState } from "react";
import "./orders.css";
import { getOrders } from "../../shared/services/orders";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);

  const handleViewDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await getOrders();
        console.log("Orders API response:", data);
        // API returns an array directly
        setOrders(Array.isArray(data) ? data : data?.orders || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError(err?.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="orders-page">
        <div className="orders-container">
          <h1 className="orders-title">My Orders</h1>
          <p style={{ textAlign: "center", marginTop: "40px" }}>Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-page">
        <div className="orders-container">
          <h1 className="orders-title">My Orders</h1>
          <p style={{ textAlign: "center", color: "red", marginTop: "40px" }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-container">
        <h1 className="orders-title">My Orders</h1>

        {orders.length === 0 ? (
          <div className="no-orders">
            <h2>No Orders Yet</h2>
            <p>You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div className="order-card" key={order._id}>
                {/* Order Header */}
                <div className="order-header">
                  <div>
                    <p className="order-label">ORDER ID</p>
                    <p className="order-id">#{order._id}</p>
                  </div>

                  <span className={`order-status ${order.status}`}>
                    {order.status}
                  </span>
                </div>

                {/* Payment ID */}
                {order.paymentId && (
                  <div className="order-payment-id">
                    <span className="order-label">PAYMENT ID</span>
                    <span className="payment-id-value">{order.paymentId}</span>
                  </div>
                )}

                {/* Order Date */}
                <div className="order-date">
                  <span>Ordered on {formatDate(order.createdAt)}</span>
                  <span>{formatTime(order.createdAt)}</span>
                </div>

                {/* Products */}
                <div className="order-products">
                  {order.productDetails && order.productDetails.length > 0 ? (
                    order.productDetails.map((product) => (
                      <div className="order-product" key={product._id}>
                        <div className="product-info">
                          <div className="product-image">🍔</div>

                          <div>
                            <h3>{product.itemName}</h3>
                            <p>Qty: {product.quantity}</p>
                          </div>
                        </div>

                        <div className="product-price">
                          ₹{product.price * product.quantity}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="empty-order">
                      <span className="empty-icon">📦</span>
                      <div>
                        <h3>Order is being processed</h3>
                        <p>Product details are not available yet.</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Order Footer */}
                <div className="order-footer">
                  {expandedOrder === order._id && (
                    <div className="order-details">
                      <div className="price-row">
                        <span>Item Total</span>
                        <span>₹{order.totalAmount || 0}</span>
                      </div>

                      <div className="price-row">
                        <span>GST</span>
                        <span>₹10</span>
                      </div>

                      <div className="price-row">
                        <span>IGST</span>
                        <span>₹10</span>
                      </div>

                      <div className="price-row">
                        <span>Delivery Charge</span>
                        <span>₹40</span>
                      </div>

                      <div className="price-divider"></div>

                      <div className="price-row total-row">
                        <strong>Total</strong>
                        <strong>₹{order.totalAmount || 0}</strong>
                      </div>
                    </div>
                  )}

                  <div className="d-flex justify-content-between w-100">
                    <div className="order-total">
                      <span>Total Amount</span>
                      <strong>₹{order.totalAmount || 0}</strong>
                    </div>

                    <button
                      className="view-order-btn"
                      onClick={() => handleViewDetails(order._id)}
                    >
                      {expandedOrder === order._id ? "Hide Details" : "View Details"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
