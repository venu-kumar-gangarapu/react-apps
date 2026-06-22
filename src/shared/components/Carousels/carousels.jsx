import "./carousels.css";

export default function CarouselCard({ image, name, price, rating }) {
  const offers = [
    {
      image: "/assets/food/images1.jpg",
      title: "50% OFF On First Order",
      subtitle: "Use Code FIRST50",
    },
    {
      image: "/assets/food/images5.jpg",
      title: "Free Delivery",
      subtitle: "Orders Above ₹499",
    },
    {
      image: "/assets/food/images12.jpg",
      title: "Weekend Special",
      subtitle: "Flat ₹150 OFF",
    },
  ];
  return (
    <>
      <div
        id="carouselExampleControls"
        class="carousel slide food-card"
        data-ride="carousel"
      >
        <div class="carousel-inner food-details-grid">
          {offers.map((items) =>   (
            <div class="carousel-item active w-50">
              <img className="img-food-card" src={items.image} alt={name} />
              <div className="food-info">
                <h3>{name}</h3>

                <div className="food-details">
                  <span>⭐ {rating}</span>
                  <span>₹{price}</span>
                </div>

                {/* <button>Add To Cart</button> */}
              </div>
            </div>
          ))}
        </div>
        <button
          class="carousel-control-prev"
          href="#carouselExampleControls"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>
        <button
          class="carousel-control-next"
          href="#carouselExampleControls"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
      </div>
    </>
  );
}
