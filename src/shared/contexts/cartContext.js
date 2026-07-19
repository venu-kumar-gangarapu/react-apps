import { createContext } from "react"

const CartProvider = createContext();
export function CartContext(){
    return (
        <CartProvider></CartProvider>
    )
}