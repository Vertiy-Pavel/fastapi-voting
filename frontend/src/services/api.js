import axios from "axios";
import {toast} from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL;

// Экземпляр Axios с базовым URL
const api = axios.create({
    baseURL: API_URL,
    // withCredentials: true,
});

// Перехватчик запросов
api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        const csrfToken = localStorage.getItem('csrf-token');

        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
            config.headers['X-CSRFToken'] = `${csrfToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// Перехватчик ответов
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Обработка ошибок
        if (error.response) {
            const {status, data} = error.response;

            switch (status) {
                case 400:
                    if (data.errors) {
                        toast.error(`Введены неверные данные`)
                    } else toast.error(`Ошибка 400: ${data.error}`);
                    break;
                case 403:
                    toast.error(`Ошибка 403: ${data.error}`);
                    break;
                case 404:
                    toast.error(`Ошибка 404: Голосование не найдено.`);
                    break;
                case 409:
                    toast.error(`Ошибка 409: ${data.error}`);
                    break;
                case 500:
                    toast.error(`Ошибка 500: ${data.error}`);
                    break;
                default:
                    if (status >= 500) {
                        toast.error(`Произошла ошибка на сервере (${status}). Пожалуйста, попробуйте позже.`);
                    } else {
                        toast.error(`Неизвестная ошибка: ${status}, ${data.error}`);
                    }
                    break;
            }
        } else {
            toast.error('Сетевая ошибка. Проверьте ваше подключение.');
        }

        return Promise.reject(error);
    }
)

export const    register = async (formData) => {
    const response = await api.post(`/user/register`, formData, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
};

export const loginUser = async (email, password, remember_me) => {
    return await api.post(`/user/login`, {
        email,
        password,
        remember_me,
    });
};

export const userInfo = async () => {
    const response = await api.get(`/users/user-info`, {});
    return response.data;
};

export const getProfileData = async () => {
    const response = await api.get(`/users/profile`, {
        headers: {

            "Content-Type": "application/json",
        },

    });

    return response.data;
};

export const updateProfileData = async (profileData) => {
    const response = await api.put(`/users/profile`, profileData, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
};

export const changePassword = async (passwords) => {
    const response = await api.put(
        `/users/change-password`,
        passwords,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return response.data;
};

export const getVotings = async (page = 1, find = '', status = '') => {
    const params = {
        page: page,
        find: find,
    }

    if (status !== '') {
        params.status = status
    }

    const response = await api.get(`/votings/`, {
        headers: {
            "Content-Type": "application/json",
        },
        params
    });
    return response.data;
};

export const createVoting = async (votingData) => {
    const response = await api.post(`/votings/`, votingData, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
};

export const getVotingData = async (votingId) => {
    const response = await api.get(`/votings/${votingId}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
}

export const getLinkToVoting = async (votingId) => {
    const response = await api.post(`/votings/${votingId}/generate-link`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
}

export const getQRcode = async (votingId) => {
    const response = await api.post(`/votings/${votingId}/generate-qr-code`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
}

export const getVotingStats = async (votingId) => {
    const response = await api.get(`/votings/${votingId}/statistics`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
}

export const getVotingParticipants = async (votingId, find = '') => {
    const response = await api.get(`/votings/${votingId}/participants`, {
        headers: {
            "Content-Type": "application/json",
        },
        params: {
            find: find,
        },
    });
    return response.data;
}

export const getVotingResults = async (votingId) => {
    const response = await api.get(`/votings/${votingId}/results`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
}

export const registerUserForVoting = async (votingId) => {
    const response = await api.post(`/votings/${votingId}/register`, {}, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
}

export const sendVote = async (votingId, answer) => {
    const response = await api.post(`/votings/${votingId}/vote`, answer, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
}

export const deleteVote = async (votingId) => {
    const response = await api.delete(`/votings/${votingId}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
}

export const getDepartments = async (pageNum = 1) => {
    const response = await api.get(`/departments/`, {
        headers: {
            "Content-Type": "application/json",
        },
        params: {
            page: pageNum,
        }
    });
    return response.data;
}

export const sendToArchive = async (votingId) => {
    const response = await api.put(`/votings/${votingId}/archive`, null, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
}

export const unArchive = async (votingId) => {
    const response = await api.put(`/votings/${votingId}/unarchive`, null, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
}

export const requestVerificationCode = async (email) => {
    const data = {
        email: email
    };

    const response = await api.post('/auth/request-verification-code', data, {
        headers: {
            "Content-Type": "application/json",
        }
    })
    return response.data;
}

export const confirmEmail = async (email, code) => {
    const data = {
        code: code,
        email: email

    };

    const response = await api.post('/auth/confirm-email', data, {
        headers: {
            "Content-Type": "application/json",
        }
    })
    return response.data;
}

export const saveTemplate = async (template) => {
    const response = await api.post(`/templates/`, template)
    return response.data;
}

export const getTemplates = async (page = 1, find = '', status = '') => {
    const params = {
        page: page,
        find: find,
    }

    if (status !== '') {
        params.status = status
    }

    const response = await api.get(`/templates/`, {
        headers: {
            "Content-Type": "application/json",
        },
        params
    });
    return response.data;
};

export const logout = async () => {
    const response = await api.post(`/auth/logout`)
    return response.data;
}

export const logoutRefresh = async () => {
    const response = await api.post(`/auth/logout_refresh`)
    return response.data;
}

export const getDepartmentsTest = async () => {
    const response = await api.get(`/departments/`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
}