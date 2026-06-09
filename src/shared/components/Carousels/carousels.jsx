import "./carousels.css";

export default function CarouselCard({
  image,
  name,
  price,
  rating
}) {
  return (
    <div className="food-card">
      <img className="img-food-card" src={image} alt={name} />

      <div className="food-info">
        <h3>{name}</h3>

        <div className="food-details">
          <span>⭐ {rating}</span>
          <span>₹{price}</span>
        </div>

        {/* <button>Add To Cart</button> */}
      </div>
    </div>
  );
}