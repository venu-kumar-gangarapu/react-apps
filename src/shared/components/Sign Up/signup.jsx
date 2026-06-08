import { useNavigate } from "react-router-dom";
import "./signup.css";

export default function Signup() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create Account</h2>

        <form>
          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm Password" />

          <button type="submit" className="auth-btn">
            Create Account
          </button>
        </form>

        <p className="auth-link">
          Already have an account? <span onClick={()=>handleLogin()}>Login</span>
        </p>
      </div>
    </div>
  );
}
