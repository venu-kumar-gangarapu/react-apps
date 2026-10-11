import { useNavigate } from "react-router-dom";
import "./signup.css";
import { useContext, useState } from "react";
import { register } from "../../services/auth";
import Loader from "../Loader/loader";
import { DialogBoxContext } from "../../contexts/dialogContext";

export default function Signup() {
  const navigate = useNavigate();
  const { dispatchDialog } = useContext(DialogBoxContext);

  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    cmfPassword: ""
  });

  const [loader, setLoader] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = () => {
    navigate("/login");
  };

  const changes = (e) => {
    const { name, value } = e.target;

    setUserDetails({
      ...userDetails,
      [name]: value
    });

    // Clear error while typing
    if (name === "password" || name === "cmfPassword") {
      setPasswordError("");
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    const { username, email, password, cmfPassword } = userDetails;

    // Check password
    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    // Check confirm password
    if (!cmfPassword) {
      setPasswordError("Please confirm your password");
      return;
    }

    // Check passwords match
    if (password !== cmfPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setPasswordError("");
    setLoader(true);

    try {
      const response = await register({
        username,
        email,
        password
      });

      console.log(response);
             dispatchDialog({
            type: "OPEN_DIALOG",
            payload: {
              title: response.message,
              message: response.success ? "Welcome! You have successfully Created account." : response.message,
              onConfirm: () => {
                response.success ?navigate("/login") : navigate("/sign-up");
              }
            }
          });

    } catch (error) {
      console.log(error);

    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      {loader && <Loader />}
      {!loader && (
        <div className="auth-page">
          <div className="auth-card">
            <h2>Create Account</h2>
            <form onSubmit={submit}>
              <input
                type="text"
                name="username"
                value={userDetails.username}
                placeholder="Full Name"
                onChange={changes}
              />
              <input
                type="email"
                name="email"
                value={userDetails.email}
                placeholder="Email Address"
                onChange={changes}
              />
              <input
                type="password"
                name="password"
                value={userDetails.password}
                placeholder="Password"
                onChange={changes}
              />
              <input
                type="password"
                name="cmfPassword"
                value={userDetails.cmfPassword}
                placeholder="Confirm Password"
                onChange={changes}
              />
              {passwordError && (
                <p className="password-error">
                  {passwordError}
                </p>
              )}
              <button
                type="submit"
                className="auth-btn"
              >
                Create Account
              </button>
            </form>
            <p className="auth-link">
              Already have an account?
              <span onClick={handleLogin}>
                Login
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}