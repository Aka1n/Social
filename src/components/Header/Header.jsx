import {NavLink} from 'react-router-dom';
import logo from '../../logo.svg';
import classes from './Header.module.css';
import defaultAva from '../../img/default-user.png';
import {useDispatch, useSelector} from "react-redux";
import {getLogin, setLogOut} from "../../redux/auth-reducer";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {CSSTransition} from "react-transition-group"

function Header() {

    const auth = useSelector(state => state.auth)
    const {user, isAuth} = auth

    const dispatch = useDispatch()

    const [editMode, setMode] = useState(false)

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
                    {
                        isAuth ? (
                        <div className={classes.side_menu}>
                            <div onClick={() => editMode ? setMode(false) : setMode(true)}
                                 className={classes.login}>{user.login}
                            </div>
                            <CSSTransition
                                in={editMode}
                                timeout={100}
                                unmountOnExit
                                classNames={{
                                    enterActive: classes.MyClassEnterActive,
                                    enterDone: classes.MyClassEnterDone,
                                    exitActive: classes.MyClassExit
                                }}>
                                <div className={classes.MyClass}>
                                    <div className={classes.hide} onClick={() => setMode(false)}></div>
                                    <div className={classes.login_menu}>
                                        <ul>
                                            <li className={classes.item}
                                            onClick={() => {
                                                dispatch(setLogOut())
                                                setMode(false)
                                            }}>
                                            <FontAwesomeIcon
                                                className={classes.icon}
                                                icon={faSignOutAlt}/>Log out</li>
                                        </ul>
                                    </div>
                                </div>
                            </CSSTransition>
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
