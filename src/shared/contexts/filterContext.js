import { createContext,useReducer } from "react";
import { filterReducer,initialState } from "../hooks/filterReducer";
import { getResturants } from "../services/resturantServices";
export const ResturantContext = createContext();
export function FilterContext({children}){
      const [state, dispatch] = useReducer(filterReducer, initialState);
      async function getResturant() {
        try {
            dispatch({type:'resturants',payload:await getResturants()})
        } catch (error) {
            console.log(error);
        }        
      }
    return( <ResturantContext.Provider  value={{state, dispatch,getResturant}}>
        {children}
    </ResturantContext.Provider>)
}