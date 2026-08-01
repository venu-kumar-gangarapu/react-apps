import { createContext, useReducer } from "react"
import { cartReducer, initialCart } from "../hooks/cartReducer";

export const CartProvider = createContext();
export function CartContext({children}){
    const [cart,dispatch] = useReducer(cartReducer,initialCart);
    console.log(cart,initialCart);
    return (
        <CartProvider.Provider value={{cart,dispatch}}>
            {children}
        </CartProvider.Provider>
    )
}