import "./App.css";
import AppRotes from "./routes";
import Header from "./shared/components/Header/header";
import { CartContext } from "./shared/contexts/cartContext";
import { FilterContext } from "./shared/contexts/filterContext";

function App() {
  return (
    <CartContext>
      <FilterContext>
        <Header isLogin="true" />
        <AppRotes />
        <Footer />
      </FilterContext>
    </CartContext>
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
