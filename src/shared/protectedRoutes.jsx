import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute(){
    const {isLoggedin} = useSelector(state => state.auth)
    if(!isLoggedin){
        return <Navigate to="/login" replace />;
    }
    return <Outlet/>
}