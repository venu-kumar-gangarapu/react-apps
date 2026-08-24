import { useNavigate } from "react-router-dom";
import "./signup.css";
import { useState } from "react";
import { register } from "../../services/auth";
import Loader from "../Loader/loader";

export default function Signup() {
  const navigate = useNavigate();
  const [userDetails,setUserDetails] = useState({});
  const [loader,setLoader] = useState(false);
  const handleLogin = () => {
    navigate("/login");
  };
  const changes =(e)=>{
    const {name,value} = e.target;
    setUserDetails({
      ...userDetails,[name]:value
    });
  }
  const submit =async (e)=>{
    e.preventDefault();
    console.log(userDetails);
    const { username,email,password} = userDetails;
    setLoader(true);
    const response = await register({ username,email,password});
    setLoader(false);
  }
  return (
    <>
    {
      loader && <Loader/>
    }
    {
      !loader &&
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create Account</h2>

        <form onSubmit={submit}>
          <input type="text" name='username' value={userDetails?.username}  placeholder="Full Name" onChange={changes}/>
          <input type="email" name='email' value={userDetails?.email} placeholder="Email Address" onChange={changes}/>
          <input type="password" name='password' value={userDetails?.password} placeholder="Password" onChange={changes}/>
          <input type="password" name='cmfPassword' placeholder="Confirm Password"  onChange={changes}/>
          <button type="submit" className="auth-btn">
            Create Account
          </button>
        </form>

        <p className="auth-link">
          Already have an account? <span onClick={()=>handleLogin()}>Login</span>
        </p>
      </div>
    </div>
    }
    </>
  );
}
