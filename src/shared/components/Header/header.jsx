import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";
import { CartProvider } from "../../contexts/cartContext";
import ResultCard from "../Result-Card/resultCard";
import { ResturantContext } from "../../contexts/filterContext";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/authSlice";

function Header({ isLogin }) {
  const navigate = useNavigate();
  const { cart } = useContext(CartProvider);
  const { state, dispatch } = useContext(ResturantContext);
  const {isLoggedin} = useSelector((state) => state.auth);
  const dispatchRedux = useDispatch();
  const [showLogout, setShowLogout] = useState(false);
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
    console.log(isLoggedin);
  }, [cart, isLoggedin]);

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
            {/* {token} */}
            {!isLoggedin &&
              <>
                <button className="login" onClick={handleLogin}>
                  Login
                </button>
                <button className="signup" onClick={handleSignUp}>
                  Sign Up
                </button>
              </>
            }
            {isLoggedin && (
              <div className="logout-container">

                <button
                  className="login"
                  onClick={() => setShowLogout(!showLogout)}
                >
                  Logout
                </button>

                {showLogout && (
                  <div className="logout-box">

                    <p>Are you sure you want to logout?</p>

                    <div className="logout-actions">
                      <button
                        onClick={() => {
                          dispatchRedux(logout());
                          setShowLogout(false);
                          navigate("/login");
                        }}
                      >
                        Logout
                      </button>

                    </div>

                  </div>
                )}

              </div>
            )}


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
