import {NavLink} from 'react-router-dom';
import logo from '../../logo.svg';
import classes from './Header.module.css';
import defaultAva from '../../img/default-user.png';
import {useDispatch, useSelector} from "react-redux";
import {getLogin, setLogOut} from "../../redux/auth-reducer";
import {useEffect} from "react";

function Header() {

    const auth = useSelector(state => state.auth)
    const {user, isAuth} = auth

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLogin(user.id))
    },[])

    return (
        <div className={classes.back}>
            <header className={classes.header}>
                <div className={classes.body}>
                    <img
                        className={`${classes.logo} ${classes.anim}`}
                        src={logo}
                        alt=""
                    />
                    <div className={classes.brand}>React</div>
                </div>
                <div className={classes.body_login}>
                    <img
                        className={classes.avatar}
                        src={user.img ? user.img : defaultAva}
                        alt=""
                    />
                    {isAuth ? (
                        <div onClick={() => dispatch(setLogOut())} className={classes.login}>
                            {user.login}
                        </div>
                    ) : (
                        <NavLink to="/login" className={classes.login}>
                            login
                        </NavLink>
                    )}
                </div>
            </header>
        </div>
    );
}

export default Header;
