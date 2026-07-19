import "./App.css";
import AppRotes from "./routes";
import Header from "./shared/components/Header/header";
import { FilterContext } from "./shared/contexts/filterContext";

function App() {
  return (
    <FilterContext>
      <Header isLogin="true" />
        <AppRotes/>
      <Footer />
    </FilterContext>
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
