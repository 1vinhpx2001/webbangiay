import { get,del } from "../axios/Instance";

export const getCart = async () =>{
    try {
        const response = await get('/cart');
        return response
    } catch (error) { 
        return error.response.data 
    };
}

export const removeItemFromCart = async (cartItemId) =>{
    try {
        const response = await del(`/cart/${cartItemId}`);
        return response
    } catch (error) { 
        return error.response.data 
    };
}