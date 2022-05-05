
export type DialogType = {
    hasNewMessages: boolean,
    id: number,
    lastDialogActivityDate: string,
    lastUserActivityDate: string,
    newMessagesCount: number
    photos: PhotosType
    userName: string
}

export type PhotosType = {
    large: string | undefined
    small: string | undefined
}

export type MessageType = {
    addedAt: string
    body: string
    id: string
    recipientId: number
    senderId: number
    senderName: string
    translatedBody: string
    viewed: boolean
}

export type UserType = {
    name: string,
    id: number,
    followed: boolean,
    uniqueUrlName: string,
    photos: {
        large: string,
        small: string
    }
    status: string

}

export type FriendType = {
    name: string,
}

export type PostType = {
    id: number,
    liked: boolean,
    likes: number,
    text: string
}

export type ProfileType = {
    fullName: string,
    userId: number,
    photos: {
        large: string,
        small: string
    },
    lookingForAJobDescription: string,
    lookingForAJob: boolean,
    contacts: {
        facebook: string,
        github: string,
        instagram:  string,
        mainLink: string,
        twitter: string,
        vk: string,
        website: string,
        youtube: string,
    },
    aboutMe: string
}

export type MyErrorsType = {
    img: null | string
    contacts: null | Array<string>
}

export type UserDialogType = {
    hasNewMessages: boolean
    id: number
    lastDialogActivityDate: string
    lastUserActivityDate: string
    newMessagesCount: number
    photos: PhotosType
    userName: string
}

export enum ResultCode {
    Resolve = 0,
    Reject = 1,
    Captcha = 10
}

export type commonDialog = {
    userId: number
    userName: string
    message: string
    photo: string | null
}
