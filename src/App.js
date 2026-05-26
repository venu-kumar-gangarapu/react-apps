import { useState } from "react";
import "./App.css";
import Header from "./Header/header";
import { Main } from "./Main/main";
import Card from "./Card/card"

function App() {
  return (
    <>
      <Header isLogin="true" />
      <Main/>
      {/* <Card/> */}
      <Footer />
    </>
  );
}

function Footer() {
  return (
    <>
      <footer>jklkkk</footer>
    </>
  );
}
export default App;
