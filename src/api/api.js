import * as axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '07c7c199-262b-4468-8fc2-3e55944f3d66',
  },
});

export const usersApi = {
  async getUsers(pageNumber, searchUsers) {
    const resolve = await instance
      .get(`users?count=12&page=${pageNumber}&term=${searchUsers}`);
    return resolve.data;
  },
};

export const followApi = {
  async getFollow(userId) {
    const resolve = await instance.post(`follow/${userId}`, {});
    return resolve.data;
  },
  async getUnFollow(userId) {
    const resolve = await instance.delete(`follow/${userId}`);
    return resolve.data;
  },
};

export const authApi = {
  async getAuthMe() {
    const resolve = await instance.get('auth/me');
    return resolve.data;
  },
  async getSignIn({
    email, password, rememberMe, captcha,
  }) {
    const resolve = await instance
      .post('auth/login', {
        email,
        password,
        rememberMe,
        captcha,
      });
    return resolve.data;
  },
  async getLogOut() {
    const resolve = await instance.delete('auth/login');
    return resolve.data;
  },
};

export const profileApi = {
  async getProfile(userId) {
    const resolve = await instance.get(`/profile/${userId}`);
    return resolve.data;
  },
  async getStatus(userId) {
    const resolve = await instance.get(`/profile/status/${userId}`);
    return resolve.data;
  },
  async setStatus(status) {
    const resolve = await instance
      .put('/profile/status/', {
        status,
      });
    return resolve.data;
  },
  async setPhoto(image) {
    const formData = new FormData()
    formData.append("image", image)
    const resolve = await instance.put('/profile/photo', formData, {
      headers : {
        "Content-Type": "multipart/form-data"
      }
    })
    return resolve.data
  },
  async setInfo(info) {
    const resolve = await instance.put('/profile', info)
    return resolve.data
  }
};

export const securityApi = {
  async getCaptcha() {
    const resolve = await instance.get('/security/get-captcha-url');
    return resolve.data;
  },
};

export const dialogApi = {
  async getDialogs() {
    const resolve = await instance.get('/dialogs');
    return resolve.data;
  },
  async getMessages(userId) {
    const resolve = await instance.get(`/dialogs/${userId}/messages`)
    return resolve.data
  },
  async setNewMessage(userId, message) {
    const resolve = await instance.post(`/dialogs/${userId}/messages`, {
      body : message
    })
    return resolve.data
  },
  async setDialog(userId) {
    const resolve = await instance.put(`/dialogs/${userId}`, {userId})
    return resolve.data
  }
};











