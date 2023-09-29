import { post} from '../axios/Instance'

// export const userRegister = (data) =>{
//     const url = `/api/auth/register`;
//     return Instance.post(url, data);
// }

// export const verifyUse = (data) =>{
//     const url = '/api/auth/verify';
//     return Instance.post(url, data);
// }

export const userLogin = async (data={}) =>{
    try {
        const response = await post('/auth/login',data);
        return response
    } catch (error) { 
        return error.response
    };

}