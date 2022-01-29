import classes from './Login.module.css'
import {useForm} from "react-hook-form";


function Login() {
    const {register,
    formState : {
        errors
    },
    handleSubmit
    } = useForm()

    const onSubmit = (data) => console.log(data)

    return (
        <div className={classes.login}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Login:
                <input {...register('login')}/>
                </label>
                <label>
                    Password:
                <input {...register('password')}/>
                </label>
                <input className={classes.button} type="submit"/>
            </form>
        </div>
    )
}

export default Login