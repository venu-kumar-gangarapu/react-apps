import Banner from "../shared/components/Banner/banner";
import CarouselCard from "../shared/components/Carousels/carousels";
import "./main.css";
import { useContext, useEffect, useState } from "react";
import { ResturantContext } from "../shared/contexts/filterContext";
import { Resturants } from "../features/Resturants-List/resutarunt-list";

export function Main() {
  const [data,setData] = useState([]);
  const {state,getResturant }  = useContext(ResturantContext);

  useEffect(()=>{
    getResturant();
    console.log(state);
  },[]);

  return (
    <div className="main-container">
      <Banner/>
      <CarouselCard/>
      <Resturants data={state?.viewFoodItems}/>
    </div>
  );
}
 