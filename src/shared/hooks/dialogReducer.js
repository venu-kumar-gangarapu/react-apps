
const dialogBoxState = {
    open: false,
    title: "",
    message: "",
    onConfirm: null,
    resetCart:false,
    cartItem:{item : {},restaurant: ''}
}

function dialogReducer(state, action) {
    switch (action.type) {
        case "OPEN_DIALOG":
            return {
                open: true,
                title: action.payload.title,
                message: action.payload.message,
                onConfirm: action.payload.onConfirm,
                cartItem:{ item : action.payload.cartItem.item, restaurant: action.payload.cartItem.restaurant }
            };
        case "CLOSE_DIALOG":
            return dialogBoxState;
        case "CONFIRM":
            return dialogBoxState;
        case "remove cart items":
            return {...state,resetCart : true};
        default:
            return { ...state }
    }
}

export { dialogBoxState, dialogReducer }