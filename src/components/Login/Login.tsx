import classes from './Login.module.css'
import {SubmitHandler, useForm} from "react-hook-form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {setSignIn} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
import Loading from "../../common/Loading/Loading";
import {FC, useEffect} from "react";
import {AppDispatch, RootState} from "../../redux/redux-store";


type Data = {email: string, password: string, rememberMe: boolean, captcha: string}


const Login: FC = () => {

    const {
        register,
        formState: {
            errors,
            isValid
        },
        setError,
        reset,
        handleSubmit,

    } = useForm<Data>({
        mode: "all"
    })


    const auth = useSelector((state: RootState) => state.auth)

    const {isAuth, isLoading, captchaUrl, authErrors} = auth

    const dispatch: AppDispatch = useDispatch()

    const onSubmit: SubmitHandler<Data> = (data) => {
        dispatch(setSignIn(data))
        reset({
            "email": data.email
        })
    }

    const signErrors = {
        valid : 'Enter valid Email',
        emailPass : 'Incorrect Email or Password',
        captcha : 'Incorrect anti-bot symbols'
    }

    useEffect(() => {

        if (authErrors === signErrors.valid || authErrors === signErrors.emailPass) {
            setError("email", {
                type: "manual",
                message : authErrors
            })
        }
        if (authErrors === signErrors.emailPass) {
            setError('password', {
                type: "manual",
                message : authErrors
            })
        }
        if (authErrors === signErrors.captcha) {
            setError('captcha', {
                type: "manual",
                message : authErrors
            })
        }

    }, [authErrors, errors])

    if (isLoading) {
        return <Loading/>
    }

    if (isAuth) {
        return <Navigate to='/profile'/>
    }

    return (
        <div className={classes.login}>
            <div className={classes.body}>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>
                        Login:
                        <input autoFocus={authErrors !== signErrors.captcha}
                               className={errors?.email ? classes.input_error : classes.input}
                               placeholder={'Email...'}  {...register('email', {
                            required: 'Enter email',
                            pattern: {
                                value : /[A-za-z]/,
                                message : 'Only latin characters'
                            }
                        })}/>
                        {errors?.email && <p className={classes.error}>
                            <FontAwesomeIcon className={classes.icon}
                                             icon={faExclamationCircle}/>{errors.email.message}</p>}
                    </label>
                    <label>
                        Password:
                        <input autoFocus={authErrors === signErrors.captcha}
                               type='password' className={errors?.password ? classes.input_error : classes.input}
                               placeholder={'Password...'} {...register('password', {
                            required: 'Enter password'
                        })}/>
                        {errors?.password && <p className={classes.error}>
                            <FontAwesomeIcon
                                className={classes.icon}
                                icon={faExclamationCircle}/>{errors.password.message}</p>}
                    </label>
                    <div className={classes.remember}>
                        <input className={classes.checkbox} type="checkbox" {...register('rememberMe')}/>
                        <div className={classes.text}>Remember me</div>
                    </div>
                    {captchaUrl && <div className={classes.captcha}>
                        <img src={captchaUrl} alt=""/>
                        <input
                            className={errors?.captcha ? classes.input_error : classes.input}
                            {...register("captcha", {
                            required: "Enter characters from the picture"
                        })}/>
                        {errors.captcha && <p className={classes.error}>
                            <FontAwesomeIcon
                                className={classes.icon}
                                icon={faExclamationCircle}/>{errors.captcha.message}</p>}
                    </div>}
                    <input className={classes.button} disabled={!isValid} type="submit" value='Sing In'/>
                </form>
            </div>
        </div>
    )
}

export default Login