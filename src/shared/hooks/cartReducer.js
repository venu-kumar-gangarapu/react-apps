const initialCart = {
    cartSize : 0,
    cartItem : [],
    totalCartValue : 0
}
function cartReducer(state,action){
    switch (action.type) {
        case "Add to Cart":
            return {...state , cartSize : state.cartSize + 1 , cartItem : [...state.cartItem,action.payload],totalCartValue:getCartValue(state)};
        case "Remove from Cart":            
            console.log(removeItem(state,action.payload.index));
            return {...state , cartSize : state.cartSize - 1 , cartItem : [...removeItem(state,action.payload.index)],totalCartValue:getCartValue(state)}
        case "total cart value":
            return {...state,totalCartValue:getCartValue(state)}
        default:
            break;
    }
}

function removeItem(state,index){
    return state.cartItem.filter((item,i)=> index !== i );
}

function getCartValue(state){
    return state.cartItem.reduce((sum, current)=> {return sum + current?.price},0);
}

export {initialCart,cartReducer}