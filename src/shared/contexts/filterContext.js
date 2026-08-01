import { createContext,useReducer } from "react";
import { filterReducer,initialState } from "../hooks/filterReducer";
export const ResturantContext = createContext();
export function FilterContext({children}){
      const [state, dispatch] = useReducer(filterReducer, initialState);
    return( <ResturantContext.Provider  value={{state, dispatch}}>
        {children}
    </ResturantContext.Provider>)
}