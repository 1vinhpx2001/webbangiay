import {get,put} from '../axios/Instance'

export const forgotPassword = async (data,id) =>{
    try{
        const response = await put(`/auth/reset/password/${id}`,data);
        return response
    }catch(error){
        return error.response
    }
}

export const getRecommendProducts = async () =>{
    try {
        const response = await get('/users/recommend');
        return response
    } catch (error) { 
        return error.response.data 
    };

}

export const getUserByID = async (id) =>{
    try{
        const response = await get(`/users/${id}`);
        return response
    }catch(error){
        return error.response
    }
}

export const updateUserByID = async (data,id) =>{
    try{
        const response = await put(`/users/${id}`,data);
        return response
    }catch(error){
        return error.response
    }
}

export const changePassword = async (data,id) =>{
    try{
        const response = await put(`/users/password/${id}`,data);
        return response
    }catch(error){
        return error.response
    }
}