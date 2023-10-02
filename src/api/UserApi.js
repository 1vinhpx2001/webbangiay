import {get,put,postImage} from '../axios/Instance'

export const forgotPassword = async (data,id) =>{
    try{
        const response = await put(`/auth/reset/password/${id}`,data);
        return response
    }catch(error){
        return error.response
    }
}