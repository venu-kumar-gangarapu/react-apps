import './main.css'
const data = [
  {
    id: 1,
    name: "Zen - The Park",
    rating: 4.5,
    cuisines: ["Asian", "Chinese", "Thai", "Malaysian"],
    priceForTwo: 3500,
    location: "Park Street Area, Kolkata",
    distance: "2.4 km",
    openingTime: "7pm",
    offer: "Flat 15% OFF",
    image: "assets/food/images1.jpg",
  },
  {
    id: 2,
    name: "Lmnoq",
    rating: 3.8,
    cuisines: ["Continental", "Italian", "North Indian"],
    priceForTwo: 1700,
    location: "Park Street Area, Kolkata",
    distance: "2.6 km",
    openingTime: "12:30pm",
    offer: null,
    image: "assets/food/images2.jpg",
  },
  {
    id: 3,
    name: "Orange Lounge & Pub",
    rating: null,
    cuisines: ["Continental", "Asian"],
    priceForTwo: 2500,
    location: "Camac Street Area, Kolkata",
    distance: "3.4 km",
    openingTime: "12 noon",
    offer: "New",
    image: "assets/food/images3.jpg",
  },
  {
    id: 4,
    name: "The Flamboyant",
    rating: 4.6,
    cuisines: ["North Indian", "Chinese"],
    priceForTwo: 2000,
    location: "Chowringhee, Kolkata",
    distance: "2.4 km",
    openingTime: "12 noon",
    offer: "Flat 15% OFF",
    image: "assets/food/images4.jpg",
  },
  {
    id: 5,
    name: "Rever Cafe",
    rating: 4.3,
    cuisines: ["North Indian", "Chinese", "Pizza"],
    priceForTwo: 1000,
    location: "Dobson Road, Howrah",
    distance: "3.1 km",
    openingTime: "12 noon",
    offer: null,
    image: "assets/food/images5.jpg",
  },
  {
    id: 6,
    name: "Corridor Bar & Kitchen",
    rating: 4.4,
    cuisines: ["North Indian", "Chinese"],
    priceForTwo: 1800,
    location: "Chowringhee, Kolkata",
    distance: "2.5 km",
    openingTime: "2pm",
    offer: "Flat 10% OFF",
    image: "assets/food/images6.jpg",
  },
  {
    id: 7,
    name: "Pawan Putra",
    rating: 4.4,
    cuisines: ["North Indian", "Chinese"],
    priceForTwo: 1200,
    location: "Kankurgachi, Kolkata",
    distance: "2.8 km",
    openingTime: "12 noon",
    offer: "Flat 10% OFF",
    image: "assets/food/images7.jpg",
  },
  {
    id: 8,
    name: "Park Street Social",
    rating: 4.4,
    cuisines: ["North Indian", "Fast Food", "Continental"],
    priceForTwo: 1500,
    location: "Park Street Area, Kolkata",
    distance: "2.5 km",
    openingTime: "11am",
    offer: null,
    image: "assets/food/images8.jpg",
  },
  {
    id: 9,
    name: "Hard Rock Cafe",
    rating: 4.5,
    cuisines: ["American", "Continental", "Italian"],
    priceForTwo: 2000,
    location: "Park Street Area, Kolkata",
    distance: "2.5 km",
    openingTime: "12 noon",
    offer: "Flat 10% OFF",
    image: "assets/food/images9.jpg",
  },
  {
    id: 10,
    name: "Barbeque Nation",
    rating: 4.3,
    cuisines: ["North Indian", "BBQ"],
    priceForTwo: 1800,
    location: "Salt Lake, Kolkata",
    distance: "4.1 km",
    openingTime: "12 noon",
    offer: "Flat 20% OFF",
    image: "assets/food/images10.jpg",
  },
  {
    id: 11,
    name: "Arsalan",
    rating: 4.6,
    cuisines: ["Mughlai", "Biryani"],
    priceForTwo: 1200,
    location: "Park Circus, Kolkata",
    distance: "3.2 km",
    openingTime: "11am",
    offer: null,
    image: "assets/food/images11.jpg",
  },
  {
    id: 12,
    name: "Peter Cat",
    rating: 4.5,
    cuisines: ["Continental", "North Indian"],
    priceForTwo: 2200,
    location: "Park Street, Kolkata",
    distance: "2.1 km",
    openingTime: "12 noon",
    offer: null,
    image: "assets/food/images12.jpg",
  },
  {
    id: 13,
    name: "Wow! Momo",
    rating: 4.2,
    cuisines: ["Chinese", "Fast Food"],
    priceForTwo: 600,
    location: "Multiple Outlets",
    distance: "1.5 km",
    openingTime: "10am",
    offer: "Flat 10% OFF",
    image: "assets/food/images13.jpg",
  },
  {
    id: 14,
    name: "KFC",
    rating: 4.1,
    cuisines: ["Fast Food", "American"],
    priceForTwo: 800,
    location: "City Centre, Kolkata",
    distance: "2.7 km",
    openingTime: "10am",
    offer: null,
    image: "assets/food/images14.jpg",
  },
  {
    id: 15,
    name: "Domino's Pizza",
    rating: 4.0,
    cuisines: ["Pizza", "Fast Food"],
    priceForTwo: 900,
    location: "Multiple Outlets",
    distance: "2.0 km",
    openingTime: "11am",
    offer: "Buy 1 Get 1",
    image: "assets/food/images15.jpg",
  },
  {
    id: 16,
    name: "Mainland China",
    rating: 4.4,
    cuisines: ["Chinese"],
    priceForTwo: 2500,
    location: "South City Mall, Kolkata",
    distance: "5.3 km",
    openingTime: "12 noon",
    offer: null,
    image: "assets/food/images16.jpg",
  },
  {
    id: 17,
    name: "Baskin Robbins",
    rating: 4.3,
    cuisines: ["Desserts", "Ice Cream"],
    priceForTwo: 500,
    location: "Park Street, Kolkata",
    distance: "2.2 km",
    openingTime: "11am",
    offer: "Flat 15% OFF",
    image: "assets/food/images17.jpg",
  },
  {
    id: 18,
    name: "Cafe Coffee Day",
    rating: 4.0,
    cuisines: ["Cafe", "Beverages"],
    priceForTwo: 700,
    location: "Salt Lake, Kolkata",
    distance: "3.8 km",
    openingTime: "9am",
    offer: null,
    image: "assets/food/images18.jpg",
  },
  {
    id: 19,
    name: "Haldiram's",
    rating: 4.3,
    cuisines: ["North Indian", "Snacks"],
    priceForTwo: 800,
    location: "Esplanade, Kolkata",
    distance: "2.0 km",
    openingTime: "10am",
    offer: null,
    image: "assets/food/images19.jpg",
  },
  {
    id: 20,
    name: "Subway",
    rating: 4.1,
    cuisines: ["Healthy Food", "Fast Food"],
    priceForTwo: 600,
    location: "New Market, Kolkata",
    distance: "2.3 km",
    openingTime: "10am",
    offer: "Flat 10% OFF",
    image: "assets/food/images20.jpg",
  },
];

export function Main() {
  return (
    <div className="grid">
      {data.map((data,index) => (
        <div className="card" key={index}>
          <div className="image-container">
            <img src={data.image} alt={data.name} />

            {data.offer && <span className="offer">{data.offer}</span>}

            {data.rating && <span className="rating">{data.rating} ★</span>}
          </div>

          <div className="content">
            <div className="header">
              <h3>{data.name}</h3>
              <span className="price">₹{data.priceForTwo} for two</span>
            </div>

            <p className="cuisines">{data.cuisines}</p>

            <div className="footer">
              <span>{data.location}</span>
              <span>{data.distance}</span>
            </div>

            <p className="timing">Opens at {data.openingTime}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
