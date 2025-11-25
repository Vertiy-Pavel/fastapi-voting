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

export const changeCredentials = (credentials) =>
    api.post('/profile/change-credentials', credentials)

export const changePassword = (password) =>
    api.post('/profile/change-password', password)

export const changePasswordConfirm = (uuid) =>
    api.post(`/profile/change-password-confirm/${uuid}`);

export const registerConfirmEmail = (uuid) =>
    api.post(`/auth/register-confirm/${uuid}`);

export const changeEmailConfirm = (uuid) =>
    api.post(`/profile/change-email-confirm/${uuid}`);

export const changeEmail = (data) =>
    api.post(`/profile/change-email`, data);
