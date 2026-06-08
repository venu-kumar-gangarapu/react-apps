import "./App.css";
import { Main } from "./Main/main";
import Card from "./features/Card/card"
import { Route, Routes } from "react-router-dom";
import CrystalChimney from "./Test/Test";
import Login from "./shared/components/Login/login";
import SignUp from "./shared/components/Sign Up/signup";

export default function AppRotes() {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/about" element={<Card />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/home" element={<Main />} />
            <Route path="/orders" element={<CrystalChimney />} />
        </Routes>
    )
}