import axios from 'axios';
import {MessageType, PhotosType, ProfileType, ResultCode, UserDialogType, UserType} from "../types/types";

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '07c7c199-262b-4468-8fc2-3e55944f3d66',
  },
});


export type ResponseType<D = {}, R = ResultCode> = {
  data: D
  resultCode: R
  messages: Array<string>
  error: string | null
  fieldsErrors?: Array<string>
}

type GetUsersResponse = {
  items: Array<UserType>
  totalCount: number
  error: string | null
}

export const usersApi = {
  async getUsers(pageNumber: number, searchUsers: string) {
    const resolve = await instance
      .get<GetUsersResponse>(`users?count=12&page=${pageNumber}&term=${searchUsers}`);
    return resolve.data;
  },
};

export const followApi = {
  async getFollow(userId: number) {
    const resolve = await instance.post<ResponseType>(`follow/${userId}`, {});
    return resolve.data;
  },
  async getUnFollow(userId: number) {
    const resolve = await instance.delete<ResponseType>(`follow/${userId}`);
    return resolve.data;
  },
};

export const authApi = {
  async getAuthMe() {
    const resolve = await instance.get<ResponseType<{id: number, login: string, email: string}>>('auth/me');
    return resolve.data;
  },
  async getSignIn({
    email, password, rememberMe, captcha,
  }: {email: string, password: string, rememberMe: boolean, captcha: string | null}) {
    const resolve = await instance
      .post<ResponseType<{userId: number}>>('auth/login', {
        email,
        password,
        rememberMe,
        captcha,
      });
    return resolve.data;
  },
  async getLogOut() {
    const resolve = await instance.delete<ResponseType>('auth/login');
    return resolve.data;
  },
};

export const profileApi = {
  async getProfile(userId: number) {
    const resolve = await instance.get<ProfileType>(`/profile/${userId}`);
    return resolve.data;
  },
  async getStatus(userId: number) {
    const resolve = await instance.get<string>(`/profile/status/${userId}`);
    return resolve.data;
  },
  async setStatus(status: string) {
    const resolve = await instance
      .put<ResponseType>('/profile/status/', {
        status,
      });
    return resolve.data;
  },
  async setPhoto(image: any) {
    const formData = new FormData();
    formData.append('image', image);
    const resolve = await instance.put<ResponseType<{photos: PhotosType}>>('/profile/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return resolve.data;
  },
  async setInfo(info: any) {
    const resolve = await instance.put<ResponseType>('/profile', info);
    return resolve.data;
  },
};

export const securityApi = {
  async getCaptcha() {
    const resolve = await instance.get<{url: string}>('/security/get-captcha-url');
    return resolve.data;
  },
};

type NewSetMessage = {
    message: {
      addedAt: string
      body: string
      deletedByRecipient: boolean
      deletedBySender: boolean
      distributionId: null | number
      id: string
      isSpam: boolean
      recipientId: number
      recipientName: string
      senderId: number
      senderName: string
      translatedBody: null | any
      viewed: boolean
    }
}

export const dialogApi = {
  async getDialogs() {
    const resolve = await instance.get<Array<UserDialogType>>('/dialogs');
    return resolve.data;
  },
  async getMessages(userId: number) {
    const resolve = await instance.get<{
      error: string | null, items: Array<MessageType>, totalCount: number
    }>(`/dialogs/${userId}/messages`);
    return resolve.data;
  },
  async setNewMessage(userId: number, message: string) {
    const resolve = await instance.post<ResponseType<NewSetMessage>>(`/dialogs/${userId}/messages`, {
      body: message,
    });
    return resolve.data;
  },
  async setDialog(userId: number) {
    const resolve = await instance.put<ResponseType>(`/dialogs/${userId}`, { userId });
    return resolve.data;
  },
};
