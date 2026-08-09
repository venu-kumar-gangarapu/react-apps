import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";
import { CartProvider } from "../../contexts/cartContext";
import ResultCard from "../Result-Card/resultCard";
import { ResturantContext } from "../../contexts/filterContext";

function Header({ isLogin }) {
  const navigate = useNavigate();
  const { cart } = useContext(CartProvider);
  const { state, dispatch } = useContext(ResturantContext);
  // const [openLogin, setOpenLogin] = useState(false);
  const [search, setSearch] = useState("");
  const [loaction, setLoaction] = useState("Kolkata");
  const [editing, setEditing] = useState(false);
  const [editingSearch, setEditingSearch] = useState(false);
  const restaurants = [];

  function searchSubmit(event) {
    event.preventDefault();
    console.log("form", search);
  }
  const handleLogin = () => {
    navigate("/login");
  };
  const handleSignUp = () => {
    navigate("/sign-up");
  };
  const goToCart = () => {
    navigate("/cart");
  };

  const onSearch = (e) => {
    let search = e.target.value;
    setSearch(e.target.value);
    setEditingSearch(true);
    dispatch({ type: "search Resuturant", payload: search });
  };
  useEffect(() => {
    console.log(cart.cartSize);
  }, [cart]);

  return (
    <>
      <header className="header">
        <div className="header-top">
          <div className="left-section">
            <h1 onClick={() => navigate("/")}>OrderNow</h1>
            <div className="mobile-profile">👤</div>
          </div>

          <div className="right-section">
            <div className="search-container">
              <div className="location position-relative">
                <span className="icon">📍</span>

                <span className="city">
                  <input
                    value={editing ? loaction : ""}
                    placeholder={
                      editing
                        ? "Search location..."
                        : loaction || "Search location"
                    }
                    onFocus={() => {
                      setLoaction("");
                      setEditing(true);
                    }}
                    onBlur={() => {
                      if (loaction === "") {
                        setEditing(false);
                        setLoaction("Kolkata");
                      }
                    }}
                    type="text"
                    onChange={(e) => setLoaction(e.target.value)}
                  />
                </span>

                <span className="dropdown">▼</span>
              </div>

              {loaction.length > 0 && editing && (
                <div className="search-result top-78">
                  <ResultCard restaurants={restaurants} />
                </div>
              )}

              <div className="divider"></div>

              <div className="search-box">
                <form className="d-flex" onSubmit={searchSubmit}>
                  <span className="search-icon">
                    <button type="submit">🔍</button>
                  </span>

                  <input
                    value={search}
                    onChange={onSearch}
                    type="text"
                    onBlur={() => {
                      if (search === "") {
                        setEditingSearch(false);
                      }
                      setSearch("");
                    }}
                    placeholder="Search restaurant, cuisine..."
                  />
                </form>

                {search.length > 0 && editingSearch && (
                  <div className="search-result">
                    <ResultCard restaurants={state.search} />
                  </div>
                )}
              </div>
            </div>

            <button className="login" onClick={handleLogin}>
              Login
            </button>

            <button className="signup" onClick={handleSignUp}>
              Sign Up
            </button>

            <div className="header-cart align-items-center">
              <button className="signup pe-1" onClick={goToCart}>
                Cart
              </button>

              <p className="mb-0">
                (<strong>{cart?.cartSize}</strong>)
              </p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
