import reducer, {setUserData, setSignIn} from './auth-reducer'
import {authApi, ResponseType} from '../api/api'
import {ResultCode} from "../types/types";

jest.mock('../api/api')
const authApiMock = authApi as jest.Mocked<typeof authApi>

let initialState = {
    user: {
        id: 0 as number,
        login: null as string | null,
        email: null as string | null,
        img: null as string | null,
    },
    isAuth: false as boolean,
    isLoading: false as boolean,
    authErrors: '' as string,
    captchaUrl: '' as string,
};

beforeEach(() => {
    initialState = {
        user: {
            id: 0,
            login: null,
            email: null,
            img: null,
        },
        isAuth: false,
        isLoading: false,
        authErrors: '',
        captchaUrl: '',
    }
})

test('add auth info', () => {
    const newState = reducer(initialState, setUserData({
        id: 10,
        login: 'login',
        email: 'email',
        img: 'img'}))

    expect(newState.user).toEqual({
        id: 10,
        login: 'login',
        email: 'email',
        img: 'img'})
})



const result: ResponseType<{userId: number}> = {
    data: {
        userId: 1
    },
    resultCode: ResultCode.Resolve,
    messages: [],
    error: null,
    fieldsErrors: []
}

test('resolve sing in', async () => {

    authApiMock.getSignIn.mockResolvedValue(result)

    const thunk = setSignIn({email: 'string', password: 'string', captcha: 'string', rememberMe: true})
    const dispatchMock = jest.fn()
    const stateMock = jest.fn()
    await thunk(dispatchMock, stateMock, undefined)
    expect(dispatchMock).toBeCalledTimes(3)

})

export {}