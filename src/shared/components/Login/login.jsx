import { useContext, useEffect, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { DialogBoxContext } from "../../contexts/dialogContext";
import { loginUser, clearError } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {

  const navigate = useNavigate();

  const { dispatchDialog } = useContext(DialogBoxContext);

  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  const dispatch = useDispatch();

  const {
    loading,
    error,
    success
  } = useSelector((state) => state.auth);


  useEffect(() => {
    if (success) {
       dispatchDialog({
      type: "OPEN_DIALOG",
      payload: {
        title: "Login Successful",
        message: "Welcome back! You have successfully logged in.",
        onConfirm: () => {
          navigate("/");
        }
      }
    });
    }
    if (error) {
      dispatchDialog({
        type: "OPEN_DIALOG",
        payload: {
          title: "Login Failed",
          message: error.message,
          onConfirm: () => {
            dispatch(clearError());
          }
        }
      });
    }
  }, [success, error]);


  const handleSignUp = () => {
    navigate("/sign-up");
  };


  const submit = (e) => {

    e.preventDefault();

    dispatch(loginUser(user));

  };


  const onChanges = (e) => {

    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value
    });

  };


  return (
    <div className="auth-page">

      <div className="auth-card">

        <h2>Welcome Back</h2>

        <form onSubmit={submit}>

          <input
            type="text"
            placeholder="Email Address"
            name="username"
            value={user.username}
            onChange={onChanges}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={onChanges}
          />

          <button
            type="submit"
            className="auth-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="auth-link">

          Don't have an account?

          <span onClick={handleSignUp}>
            Sign Up
          </span>

        </p>

      </div>

    </div>
  );
}