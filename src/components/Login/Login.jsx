import classes from './Login.module.css'
import {useForm} from "react-hook-form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {setSignIn} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
import Loading from "../../common/Loading/Loading";
import {useEffect} from "react";




const Login = () => {

    const {
        register,
        formState: {
            errors,
            isValid
        },
        setError,
        reset,
        handleSubmit,

    } = useForm({
        mode: "all"
    })

    const state = useSelector(state => ({
        isAuth: state.auth.isAuth,
        isLoading: state.auth.isLoading,
        captchaUrl: state.auth.captchaUrl,
        errors : state.auth.errors
    }))

    const dispatch = useDispatch()

    const onSubmit = (data) => {
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

        if (state.errors === signErrors.valid || state.errors === signErrors.emailPass) {
            setError("email", {
                type: "manual",
                message : state.errors
            })
        }
        if (state.errors === signErrors.emailPass) {
            setError('password', {
                type: "manual",
                message : state.errors
            })
        }
        if (state.errors === signErrors.captcha) {
            setError('captcha', {
                type: "manual",
                message : state.errors
            })
        }

    }, [state.errors, errors])

    if (state.isLoading) {
        return <Loading/>
    }

    if (state.isAuth && !state.isLoading) {
        return <Navigate to='/profile'/>
    }

    return (
        <div className={classes.login}>
            <div className={classes.body}>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>
                        Login:
                        <input autoFocus={state.errors !== signErrors.captcha}
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
                        <input autoFocus={state.errors === signErrors.captcha}
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
                    {state.captchaUrl && <div className={classes.captcha}>
                        <img src={state.captchaUrl} alt=""/>
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