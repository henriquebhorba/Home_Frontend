// src/services/auth.ts
import api, { setAuthToken } from './api';

export const login = async (username: string, password: string) => {
    const response = await api.post('/auth/login', { username, password });
    const { access_token } = response.data;
    localStorage.setItem('token', access_token);
    setAuthToken(access_token);
    return access_token;
};

export const register = async (username: string, email: string, password: string, adminUuid?: string) => {
    const response = await api.post('/users', { username, email, password, adminUuid });
    return response.data;
};


export const logout = () => {
    localStorage.removeItem('token');
    setAuthToken('');
};

