import logo from '../../logo.svg'
import classes from './Header.module.css'
import {NavLink} from "react-router-dom";
import defaultAva from '../../img/default-user.png'

function Header(props) {
    return (
        <div className={classes.back}>
            <header className={classes.header}>
                <div className={classes.body}>
                    <img className={`${classes.logo} ${classes.anim}`} src={logo} alt=""/>
                    <div className={classes.brand}>React</div>
                </div>
                <div className={classes.body_login}>
                    <img className={classes.avatar} src={props.img ? props.img : defaultAva} alt=""/>
                    {props.isAuth ? <div onClick={() => props.setLogOut()} className={classes.login}>{props.login}</div> :
                        <NavLink to='/login' className={classes.login}>login</NavLink>}
                </div>
            </header>
        </div>
    )
}

export default Header