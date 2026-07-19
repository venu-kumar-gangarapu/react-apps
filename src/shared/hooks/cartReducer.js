const initialCart = {
    cartSize : 0,
    cartItem : [],
    totalCartValue : 0
}
function cartReducer(state,action){
    switch (action.type) {
        case "Add to Cart":
            return {...state , cartSize : initialCart.cartSize+1}
        default:
            break;
    }
}

export {initialCart,cartReducer}