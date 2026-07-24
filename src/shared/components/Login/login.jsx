import { useContext } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { DialogBoxContext } from "../../contexts/dialogContext";

export default function Login() {
  const navigate = useNavigate();
  const {dialogState,dispatchDialog} = useContext(DialogBoxContext);
  const handleSignUp = () => {
    navigate("/sign-up");
  };
  const login = (e)=>{
    e.preventDefault();
    let payload ={ title:'ggh',message:'hjgj',onConfirm:"close"}
    dispatchDialog({type:"OPEN_DIALOG",payload});
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome Back</h2>

        <form onSubmit={login}>
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
