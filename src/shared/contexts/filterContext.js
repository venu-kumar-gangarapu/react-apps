import { createContext,useReducer } from "react";
import { filterReducer,initialState } from "../hooks/filterReducer";
export const CounterContext = createContext();
export function FilterContext({children}){
      const [state, dispatch] = useReducer(filterReducer, initialState);
    return( <CounterContext.Provider  value={{state, dispatch}}>
        {children}
    </CounterContext.Provider>)
}