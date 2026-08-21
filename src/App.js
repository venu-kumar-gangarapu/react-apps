import { Provider } from "react-redux";
import "./App.css";
import AppRotes from "./routes";
import Dialog from "./shared/components/Dialogbox/dialogbox";
import Footer from "./shared/components/Footer/footer";
import Header from "./shared/components/Header/header";
import { CartContext } from "./shared/contexts/cartContext";
import { DialogContext } from "./shared/contexts/dialogContext";
import { FilterContext } from "./shared/contexts/filterContext";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <DialogContext>
        <CartContext>
          <FilterContext>
            <Header isLogin="true" />
            <AppRotes />
            <Dialog />
            <Footer />
          </FilterContext>
        </CartContext>
      </DialogContext>
    </Provider>
  );
}

export default App;
