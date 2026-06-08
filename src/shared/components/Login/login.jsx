import "./login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const handleSignUp = () => {
    navigate("/sign-up");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome Back</h2>

        <form>
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />

          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>

        <p className="auth-link">
          Don't have an account?
          <span onClick={() => handleSignUp()}>Sign Up</span>
        </p>
      </div>
    </div>
  );
}
