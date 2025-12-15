import api from '../axiosInstance.js';

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
