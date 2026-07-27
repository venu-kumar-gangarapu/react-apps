import { useContext, useRef } from "react";
import "./carousels.css";
import { useNavigate } from "react-router-dom";
import { ResturantContext } from "../../contexts/filterContext";

export default function CarouselCard({ image, name, price, rating }) {
  const food = [
  { id: 1, name: "North Indian", image: "assets/food/north-indian.png" },
  { id: 2, name: "Biryani", image: "assets/food/biryani.png" },
  { id: 3, name: "Desserts", image: "assets/food/desserts.png" },
  { id: 4, name: "Chinese", image: "assets/food/chinese.png" },
  { id: 5, name: "South Indian", image: "assets/food/south-indian.png" },
  { id: 6, name: "Cake", image: "assets/food/cake.png" },
  { id: 7, name: "Pizza", image: "assets/food/pizza.png" },
  { id: 8, name: "Dosa", image: "assets/food/dosa.png" },
  { id: 9, name: "Khichdi", image: "assets/food/khichdi.png" },
  { id: 10, name: "Salad", image: "assets/food/salad.png" },
  { id: 11, name: "Paratha", image: "assets/food/paratha.png" },
  { id: 12, name: "Pasta", image: "assets/food/pasta.png" },
  { id: 13, name: "Ice Cream", image: "assets/food/icecream.png" },
  { id: 14, name: "Jalebi", image: "assets/food/jalebi.png" },
  { id: 15, name: "Khichdi", image: "assets/food/khichdi.png" },
  { id: 16, name: "Salad", image: "assets/food/salad.png" },
  { id: 17, name: "Paratha", image: "assets/food/paratha.png" },
  { id: 18, name: "Pasta", image: "assets/food/pasta.png" },
  { id: 19, name: "Ice Cream", image: "assets/food/icecream.png" },
  { id: 20, name: "Jalebi", image: "assets/food/jalebi.png" }
];
  const sliderRef = useRef();
  const navigate = useNavigate();
  const {state,dispatch}=useContext(ResturantContext);
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

  const navigateToMenu =(name)=>{
    const data = state ?? []; 
    dispatch({type : "filter Collection"})
    navigate("/collections",{state:{data:data.viewFoodItems,name}})
  }

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

        {food.map((item) => (
          <div className="category-card" key={item.id} onClick={()=>navigateToMenu(item.name)}>

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
