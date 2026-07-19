import initialData from '../foodItems';
const initialState = {
    viewFoodItems :initialData,
    arrayLength:0
};

function filterReducer(state,action){
    switch (action.type) {
        case "offers":
            return {arrayLength : initialState.viewFoodItems.length,viewFoodItems:['viewFoodItems']}
        case "ratings":
            return {arrayLength : initialState.viewFoodItems.length,viewFoodItems:initialData.filter((elem)=> elem.rating > 4.5)}
        case "pet friendly":
            return {}
        case "outdoor seating":
            return {}
        case "open":
            return {}
        case "servesAlcohol":
            return {}
        default:
            return initialState
    }

}

export {filterReducer,initialState}