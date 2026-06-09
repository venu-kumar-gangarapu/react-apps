import "./orders.css";

const orders = [
  {
    id: 1001,
    image: "/assets/food/images8.jpg",
    item: "Veg Burger Combo",
    amount: 299,
    status: "Delivered",
  },
  {
    id: 1002,
    image: "/assets/food/images12.jpg",
    item: "Family Pizza Meal",
    amount: 799,
    status: "On The Way",
  },
];

export default function Orders() {
  return (
    <div className="orders-page">
      <h2>My Orders</h2>

      {orders.map((order) => (
        <div className="order-card" key={order.id}>
          <img src={order.image} alt="" />

          <div className="order-info">
            <h3>{order.item}</h3>
            <p>Order ID: #{order.id}</p>
            <p>₹{order.amount}</p>
          </div>

          <div className="status">
            {order.status}
          </div>
        </div>
      ))}
    </div>
  );
}