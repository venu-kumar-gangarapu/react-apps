import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import "./header.css";

function Header({ isLogin }) {
  const navigate = useNavigate();
  // const [openLogin, setOpenLogin] = useState(false);
  const [search, setSearch] = useState("");
  function searchSubmit(event){
    event.preventDefault();
    console.log('form',search);
    //controlled outputs hat controls the state of the form
  }
  const handleLogin = () => {
    navigate("/login");
  };
  const handleSignUp = () => {
    navigate("/sign-up");
  };
  return (
    <>
      <header>
        <h1 onClick={()=>navigate('/')}>OrderNow</h1>
        <div className="right-section">
          <div className="search-container">
            <div className="location">
              <span className="icon">📍</span>
              <span className="city">Kolkata</span>
              <span className="dropdown">▼</span>
            </div>

            <div className="divider"></div>

            <div className="search-box">
              <form className="d-flex" onSubmit={searchSubmit}>
                <span className="search-icon"><button type="submit">🔍</button></span>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search for restaurant, cuisine or a dish"
                />
              </form>
            </div>
          </div>
          <button className="login" onClick={()=>handleLogin()}>Login</button>
          <button className="signup" onClick={()=>handleSignUp()}>Sign Up</button>
        </div>
      </header>
    </>
  );
}

export default Header;
