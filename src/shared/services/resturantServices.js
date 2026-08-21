import api from "./axios";


const getResturants = async()=>{
   const response = await api.get('/restaurants');
   return response.data;
}

const getResturantMenu = async({id})=>{
   const response = await api.get(`${id}/restaurantsMenuItem`);
   return response.data;
}

export {getResturants,getResturantMenu};