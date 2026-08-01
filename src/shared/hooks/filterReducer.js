import initialData from '../foodItems';
const initialState = {
    viewFoodItems :initialData,
    arrayLength:0,
    search:[]
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
        case "filter Collection" :
            return {...state, viewFoodItems:getFilterCollection(state)};
            case "search Resuturant" :
            return {...state, search:getSearchData(action?.payload)};
        case "search Location" :    
            return {...state};
        default:
            return initialState
    }

}

function getFilterCollection(state){
    return state?.viewFoodItems;
}

function getSearchData(search){
    return initialData.filter((elem)=>elem?.menuData?.restaurantName.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
}

export {filterReducer,initialState}