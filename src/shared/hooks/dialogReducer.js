
const dialogBoxState = {
    open: false,
    title: "",
    message: "",
    onConfirm: null,
}

function dialogReducer(state, action) {
    switch (action.type) {
        case "OPEN_DIALOG":
            return {
                open: true,
                title: action.payload.title,
                message: action.payload.message,
                onConfirm: action.payload.onConfirm,
            };
        case "CLOSE_DIALOG":
            return dialogBoxState;
        default:
            return { ...state }
    }
}

export { dialogBoxState, dialogReducer }