import "./banner.css";

export default function Banner() {
  return (
    <section className="banner">
      <div className="banner-content">
        <h1>Get Delicious Food Delivered Fast</h1>

        <p>
          Flat 50% OFF on your first order.
          Free delivery above ₹499.
        </p>

        <button>Order Now</button>
      </div>

      <div className="banner-image">
        <img
          src="/assets/food/images12.jpg"
          alt="Food Banner"
        />
      </div>
    </section>
  );
}