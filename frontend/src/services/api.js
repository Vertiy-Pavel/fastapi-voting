import axios from "axios";
import {toast} from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL;

// Экземпляр Axios с базовым URL
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

// TODO: реализовать редирект на рефреш при ошибке 401 (при авторизации так же выдает ошибку 401)

// Добавляем CSRF токен в каждый запрос
api.interceptors.request.use((config) => {
    const csrf = localStorage.getItem("x-csrf-token");
    const accessToken = localStorage.getItem("access_token");


    // Если нет токена и это не login/refresh — сразу редиректим
    // if (
    //     !csrf &&
    //     !config.url?.includes("/auth/login") &&
    //     !config.url?.includes("/auth/refresh")
    // ) {
    //     window.location.href = "/login";
    //     return Promise.reject(new Error("No CSRF token, redirecting to login"));
    // }

    if (csrf && accessToken) {
        config.headers["X-CSRF-Token"] = csrf;
        config.headers['Authorization'] = `Bearer ${accessToken}`
    }

    return config;
});

// Флаг, чтобы не уйти в бесконечный цикл
// let isRefreshing = false;
// let refreshSubscribers = [];
//
// function onRefreshed(token) {
//     refreshSubscribers.forEach((cb) => cb(token));
//     refreshSubscribers = [];
// }
//
// api.interceptors.response.use(
//     (response) => {
//         // Если при логине сервер вернул csrf в headers — сохраняем
//         const csrf = response.headers["csrf-token"];
//         if (csrf) {
//             localStorage.setItem("csrf", csrf);
//         }
//         return response;
//     },
//     async (error) => {
//         const originalRequest = error.config;
//
//         // Если это 401 на login — значит неверные данные, просто пробрасываем ошибку
//         if (originalRequest.url.includes("/auth/login")) {
//             return Promise.reject(error);
//         }
//
//         if (error.response?.status === 401 && !originalRequest._retry) {
//             if (isRefreshing) {
//                 // Ждём пока другой запрос обновит токен
//                 return new Promise((resolve) => {
//                     refreshSubscribers.push((token) => {
//                         originalRequest.headers["csrf-token"] = token;
//                         resolve(api(originalRequest));
//                     });
//                 });
//             }
//
//             originalRequest._retry = true;
//             isRefreshing = true;
//
//             try {
//                 const res = await api.post("/auth/refresh");
//                 const newCsrf = res.headers["csrf-token"];
//                 if (newCsrf) {
//                     localStorage.setItem("csrf", newCsrf);
//                     onRefreshed(newCsrf);
//                     originalRequest.headers["csrf-token"] = newCsrf;
//                 }
//                 return api(originalRequest);
//             } catch (refreshError) {
//                 // Если refresh тоже 401 → редиректим на login
//                 window.location.href = "/login";
//                 return Promise.reject(refreshError);
//             } finally {
//                 isRefreshing = false;
//             }
//         }
//
//         return Promise.reject(error);
//     }
// );


export const register = async (formData) => {
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

// TODO: удалить
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
    const response = await api.post(`/voting/create`, votingData, {
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