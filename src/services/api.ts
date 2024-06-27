// src/services/api.ts
import axios from 'axios';
import { logout } from './auth';

const api = axios.create({
    baseURL: 'http://localhost:3000/',
});

export const setAuthToken = (token: string) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            logout();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const checkUsernameExists = async (username: string) => {
    const response = await api.get(`/users/check-username?username=${username}`);
    return response.data.exists;
};

export const checkEmailExists = async (email: string) => {
    const response = await api.get(`/users/check-email?email=${email}`);
    return response.data.exists;
};

export default api;
