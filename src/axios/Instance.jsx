import axios from 'axios'
import { clearFromLocalStorage, getFromLocalStorage } from '../utils/tokenHandle';
import { clearUserFromLocalStorage } from '../utils/userHandle';
import { API_ADDRESS, SHOP_ID, TOKEN_API_ADDRESS } from '../common/const';

const Instance = axios.create({
    baseURL: "https://sneaker-store-backend-production.up.railway.app/api"
    //baseURL: "https://sneakerheadstore-5968ae1f44cc.herokuapp.com/api"
});

const axiosCountry = axios.create({
    baseURL:API_ADDRESS,
})

Instance.interceptors.request.use(
    function (req) {
        const token = getFromLocalStorage()
        if (token)
            req.headers['authorization'] = `Bearer ${token}`;
        return req;
    },
    function (error) {
        return Promise.reject(error);
    },
);
Instance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response.status === 401) {
            clearFromLocalStorage()
            clearUserFromLocalStorage()
            window.location.href = '/'
        }
        return Promise.reject(error);
});

export const getCountryPost = async (path,params={}) => {
    const response = await axiosCountry.post(path,params,{headers:{"token":TOKEN_API_ADDRESS,"ShopId":SHOP_ID}});
    return response.data;
};

export const get = async (path, params = {}) => {
    const response = await Instance.get(path, params);
    return response.data;
};
export const post = async (path, params = {}) => {
    const response = await Instance.post(path, params);
    return response;
};
export const put = async (path, params = {}) => {
    const response = await Instance.put(path, params);
    return response.data;
};
export const patch = async (path, params = {}) => {
    const response = await Instance.patch(path, params);
    return response.data;
};
export const del = async (path, params = {}) => {
    const response = await Instance.delete(path, params);
    return response.data;
};
export const postImage = async (path, params) => {
    const response = await Instance.post(path, params,{headers:{"Content-Type": "multipart/form-data" }});
    return response;
};

export default Instance