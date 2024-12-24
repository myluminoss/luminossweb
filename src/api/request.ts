import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import localStorageUtil from '../utils/localStorage';

const HTTPBaseURL = 'https://api.luminoss.ai';
const instance: AxiosInstance = axios.create({
    baseURL: HTTPBaseURL, // 
    timeout: 10000 // 
});

instance.interceptors.request.use(
    (config: any) => {
        const token = localStorageUtil.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response: AxiosResponse) => {
        const { data } = response;
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(data);
        } else {
            return Promise.reject(new Error('req error'));
        }
    },
    (error) => {
        return Promise.reject(error);
    }
);

const get = <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return instance.get(url, config);
};

const post = <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return instance.post(url, data, config);
};

const put = <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return instance.put(url, data, config);
};

const deleteRequest = <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return instance.delete(url, config);
};

export { get, post, put, deleteRequest, instance };