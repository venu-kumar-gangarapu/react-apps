import { useRef } from "react";
import "./carousels.css";

export default function CarouselCard({ image, name, price, rating }) {
  const categories = [
  { id: 1, name: "North Indian", image: "/assets/categories/north-indian.png" },
  { id: 2, name: "Biryani", image: "/assets/categories/biryani.png" },
  { id: 3, name: "Desserts", image: "/assets/categories/desserts.png" },
  { id: 4, name: "Chinese", image: "/assets/categories/chinese.png" },
  { id: 5, name: "South Indian", image: "/assets/categories/south-indian.png" },
  { id: 6, name: "Cake", image: "/assets/categories/cake.png" },
  { id: 7, name: "Pizza", image: "/assets/categories/pizza.png" },
  { id: 8, name: "Dosa", image: "/assets/categories/dosa.png" },
  { id: 9, name: "Khichdi", image: "/assets/categories/khichdi.png" },
  { id: 10, name: "Salad", image: "/assets/categories/salad.png" },
  { id: 11, name: "Paratha", image: "/assets/categories/paratha.png" },
  { id: 12, name: "Pasta", image: "/assets/categories/pasta.png" },
  { id: 13, name: "Ice Cream", image: "/assets/categories/icecream.png" },
  { id: 14, name: "Jalebi", image: "/assets/categories/jalebi.png" },
  { id: 15, name: "Khichdi", image: "/assets/categories/khichdi.png" },
  { id: 16, name: "Salad", image: "/assets/categories/salad.png" },
  { id: 17, name: "Paratha", image: "/assets/categories/paratha.png" },
  { id: 18, name: "Pasta", image: "/assets/categories/pasta.png" },
  { id: 19, name: "Ice Cream", image: "/assets/categories/icecream.png" },
  { id: 20, name: "Jalebi", image: "/assets/categories/jalebi.png" }
];
  const sliderRef = useRef();

  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -400,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: 400,
      behavior: "smooth",
    });
  };

  return (
    <section className="category-section">

      <div className="category-header">
        <span>Order our best food options</span>

        <div className="controls">
          <button onClick={scrollLeft}>←</button>
          <button onClick={scrollRight}>→</button>
        </div>
      </div>

      <div className="category-slider" ref={sliderRef}>

        {categories.map((item) => (
          <div className="category-card" key={item.id}>

            <img
              src={item.image}
              alt={item.name}
            />

            <p>{item.name}</p>

          </div>
        ))}

      </div>

    </section>
  );
}
