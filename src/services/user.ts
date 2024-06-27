// src/services/user.ts
import api from './api';

export const getUsersByAdminUuid = async (adminUuid: string) => {
    const response = await api.get(`/users?adminUuid=${adminUuid}`);
    return response.data;
};
