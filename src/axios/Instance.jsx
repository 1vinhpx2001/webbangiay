import axios from 'axios'
import { clearFromLocalStorage, getFromLocalStorage } from '../utils/tokenHandle';
import { clearUserFromLocalStorage } from '../utils/userHandle';

const Instance = axios.create({
    baseURL: "http://localhost:8080/api"
});
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