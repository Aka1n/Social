import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '07c7c199-262b-4468-8fc2-3e55944f3d66',
    },
});

export const usersApi = {
    getUsers(pageNumber) {
        return instance
            .get(`users?count=12&page=${pageNumber}`)
            .then((resolve) => resolve.data);
    },
};

export const followApi = {
    getFollow(userId) {
        return instance
            .post(`follow/${userId}`, {})
            .then((resolve) => resolve.data);
    },
    getUnFollow(userId) {
        return instance.delete(`follow/${userId}`).then(resolve => resolve.data);
    },
};

export const authApi = {
    getAuthMe() {
        return instance.get('auth/me').then(resolve => resolve.data);
    },
    getSignIn({
                  email, password, rememberMe, captcha,
              }) {
        return instance
            .post('auth/login', {
                email,
                password,
                rememberMe,
                captcha,
            })
            .then(resolve => resolve.data);
    },
    getLogOut() {
        return instance.delete('auth/login').then(resolve => resolve.data);
    },
};

export const profileApi = {
    getProfile(userId) {
        return instance.get(`/profile/${userId}`).then(resolve => resolve.data);
    },
    getStatus(userId) {
        return instance
            .get(`/profile/status/${userId}`)
            .then(resolve => resolve.data);
    },
    setStatus(status) {
        return instance
            .put('/profile/status/', {
                status,
            })
            .then(resolve => resolve.data);
    },
};

export const securityApi = {
    getCaptcha() {
        return instance
            .get('/security/get-captcha-url')
            .then(resolve => resolve.data);
    },
};
