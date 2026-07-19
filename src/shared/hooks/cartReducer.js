const initialCart = {
    cartSize : 0,
    cartItem : [],
    totalCartValue : 0
}
function cartReducer(state,action){
    switch (action.type) {
        case "Add to Cart":
            return {...initialCart , cartSize : initialCart.cartSize++ , cartItem : [...initialCart.cartItem,action.payload]}
        case "total cart value":
            return {...initialCart,totalCartValue:0}
        default:
            break;
    }
}

export {initialCart,cartReducer}