import api from '../axiosInstance.js';

export const register = (formData) =>
    api.post('/auth/register', formData);

export const loginUser = (email, password, remember_me) =>
    api.post('/auth/login', { email, password, remember_me });

export const accessLogout = () =>
    api.post('/auth/access-logout');

export const refreshLogout = (csrfToken) =>
    api.post('/auth/refresh-logout', null, {
        headers: { 'X-CSRF-Token': csrfToken },
    });

export const refresh = (csrfToken) =>
    api.post('/auth/refresh', null, {
        headers: { 'X-CSRF-Token': csrfToken },
    });

export const registerConfirmEmail = (uuid) =>
    api.post(`/auth/register-confirm/${uuid}`);