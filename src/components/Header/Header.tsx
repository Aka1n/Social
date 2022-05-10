import {NavLink} from 'react-router-dom';
import logo from '../../logo.svg';
import classes from './Header.module.css';
import defaultAva from '../../img/default-user.png';
import {useDispatch, useSelector} from "react-redux";
import {setLogOut} from "../../redux/auth-reducer";
import React, {FC, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {CSSTransition} from "react-transition-group"
import {setActive} from "../../redux/navigation-reducer";
import {AppDispatch, RootState} from "../../redux/redux-store";

const Header = () => {

    const auth = useSelector((state:RootState) => state.auth)
    const {user, isAuth} = auth
    const img = useSelector((state: RootState) => state.auth.user.img)
    const isActive = useSelector((state: RootState) => state.navigation.isActive)

    const dispatch: AppDispatch = useDispatch()

    const [editMode, setMode] = useState(false)



    const Avatar: FC<{img: string | null | undefined}> = ({img}) => <img
                className={classes.avatar}
                src={img ? img : defaultAva}
                alt=""/>



    const activeNavigation: Function = () => isActive ?
        dispatch(setActive(false)) : dispatch(setActive(true))


    return (
        <div className={classes.back}>
            <header className={classes.header}>
                <div className={classes.body}>
                    <div className={isActive ? `${classes.burger} ${classes.burger_active}` : classes.burger}
                    onClick={() => activeNavigation()}>
                        <span/>
                        <span/>
                    </div>
                    <img
                        className={`${classes.logo} ${classes.anim}`}
                        src={logo}
                        alt=""
                    />
                    <div className={classes.brand}>React</div>
                </div>
                <div className={classes.body_login}>
                    <Avatar img={img}/>
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
                                    <div className={classes.hide} onClick={() => setMode(false)}/>
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
