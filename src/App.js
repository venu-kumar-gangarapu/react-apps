import "./App.css";
import AppRotes from "./routes";
import Header from "./shared/components/Header/header";

function App() {
  return (
    <>
      <Header isLogin="true" />
        <AppRotes/>
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
