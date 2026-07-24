import "./filter.css";
import { initialState } from "../../hooks/filterReducer";
import { useContext } from "react";
import { CounterContext } from "../../contexts/filterContext";

export default function Filter() {
  const { dispatch } = useContext(CounterContext);
  return (
    <div className="filters-container mt-4 m-116">
      <button className="filter-btn">
        <span className="icon">⚙</span>
        Filters
      </button>

      <button
        className="filter-btn"
        onClick={() => dispatch({ type: "offers" })}
      >
        Offers
      </button>
      <button
        className="filter-btn"
        onClick={() => {
          dispatch({ type: "ratings" });
          console.log(initialState);
        }}
      >
        Rating: 4.5+
      </button>
      <button
        className="filter-btn"
        onClick={() => dispatch({ type: "pet friendly" })}
      >
        Pet friendly
      </button>
      <button
        className="filter-btn"
        onClick={() => dispatch({ type: "outdoor seating" })}
      >
        Outdoor seating
      </button>
      <button
        className="filter-btn"
        onClick={() => dispatch({ type: "servesAlcohol" })}
      >
        Serves Alcohol
      </button>
      <button className="filter-btn" onClick={() => dispatch({ type: "open" })}>
        Open Now
      </button>
    </div>
  );
}
