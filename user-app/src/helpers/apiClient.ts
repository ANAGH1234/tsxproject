import axios from 'axios';
import type { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_ADDRESS } from './constant';
import authUser from './authUser';

const apiClient = axios.create({
    baseURL: API_ADDRESS,
    timeout: 500000,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (req: InternalAxiosRequestConfig) => {
        const user = authUser.Get();
        const token = user ? user.token : '';
        req.headers.Authorization = `Bearer ${token}`;
        return req;
    },
    (err: AxiosError) => {
        return Promise.reject(err);
    }
);

apiClient.interceptors.response.use(
    (res: AxiosResponse) => {
        return res;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

export default apiClient;