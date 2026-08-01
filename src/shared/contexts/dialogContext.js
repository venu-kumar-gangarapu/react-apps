import { createContext, useReducer } from "react"
import { dialogBoxState, dialogReducer } from "../hooks/dialogReducer";

export const DialogBoxContext = createContext();
export function DialogContext({ children }) {
    const [dialogState,dispatchDialog] = useReducer(dialogReducer,dialogBoxState)
    return (<DialogBoxContext.Provider value={{dialogState,dispatchDialog}}>
        {children}
    </DialogBoxContext.Provider>)

}