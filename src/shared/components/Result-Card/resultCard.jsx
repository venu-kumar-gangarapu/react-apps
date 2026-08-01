import "./resultCard.css";

export default function ResultCard({ restaurants }) {
  return (
    <div className="restaurant-list">
      {restaurants.length > 0 &&
        restaurants.map((restaurant) => (
          <div className="restaurant-card">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="restaurant-image"
            />

            <div className="restaurant-details">
              <h3>{restaurant.name}</h3>

              {/* <div className="restaurant-tags">
                <span className="dining-tag">⭐ DINING</span>

                <span className="rating-tag">{restaurant.rating}★</span>

                <span className="delivery-tag">DELIVERY</span>
              </div> */}


              <div className="status-row">
              <p className="location">{restaurant.location}</p>
                <span className="status">{restaurant.status} open</span>

                {restaurant.moreOutlet && (
                  <span className="more-outlets">View all outlets ▶</span>
                )}
              </div>
            </div>
          </div>
        ))}
      {restaurants.length === 0 && (
        <div className="restaurant-card">
          <div className="restaurant-details">
            <p className="no-data">Oops! <span>No result found</span></p>
          </div>
        </div>
      )}
    </div>
  );
}
