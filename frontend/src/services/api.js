import axios from "axios";
import {toast} from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL;

// Экземпляр Axios с базовым URL
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

// Функция для обработки очереди ожидающих запросов
const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// Перехватчик запросов
api.interceptors.request.use(config => {
    // const csrfToken1 = getCookie('csrf_refresh_token');
    const csrfRefreshToken = localStorage.getItem('x-csrf-refresh-token');
    const csrfAccessToken = localStorage.getItem('x-csrf-access-token');
    const isSafeMethod = ['get', 'head', 'options'].includes(config.method);


    if (!isSafeMethod && csrfAccessToken) {
        config.headers['X-CSRF-TOKEN'] = csrfAccessToken;
    }

    if (config.url === '/auth/refresh' && csrfRefreshToken) {
        config.headers['X-CSRF-REFRESH-TOKEN'] = csrfRefreshToken;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Перехватчик ответов
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 &&
            !originalRequest._isRetry &&
            originalRequest.url !== '/auth/refresh'
        ) {

            // Если процесс обновления уже идет, добавляем запрос в очередь
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({resolve, reject});
                }).then(() => {
                    return api(originalRequest);
                }).catch(err => Promise.reject(err));
            }

            originalRequest._isRetry = true;
            isRefreshing = true;

            try {

                // Запрос на refresh
                const refreshResponse = await api.post('/auth/refresh', {}, {});

                let newCsrfRefreshToken;
                newCsrfRefreshToken = refreshResponse.headers['x-csrf-refresh-token'];

                let newCsrfAccessToken;
                newCsrfAccessToken = refreshResponse.headers['x-csrf-access-token'];

                // Или в теле ответа, если сервер так настроен
                // const newCsrfToken = refreshResponse.data.csrf_token;

                if (newCsrfRefreshToken && newCsrfAccessToken) {
                    // Перезаписываем токен в localStorage новым значением
                    localStorage.setItem('x-csrf-refresh-token', newCsrfRefreshToken);
                    localStorage.setItem('x-csrf-refresh-token', newCsrfAccessToken);
                }

                // Обрабатываем все запросы в очереди с новым токеном
                processQueue(null);

                // Повторно отправляем оригинальный запрос
                return api(originalRequest);

            } catch (refreshError) {
                processQueue(refreshError, null);
                toast.warn('Требуется авторизация');
                console.log('Требуется авторизация');

                localStorage.removeItem('x-csrf-refresh-token');
                window.location.replace('/login');
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false; // Сбрасываем флаг

            }
        }

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

export const register = async (formData) => {
    const response = await api.post(`/auth/register`, formData, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
};

export const loginUser = async (email, password, role_id, remember_me) => {
    return await api.post(`/user/login`, {
        email,
        password,
        //  role_id,
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