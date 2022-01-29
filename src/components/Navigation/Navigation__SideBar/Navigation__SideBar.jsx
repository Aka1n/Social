import classes from './Navigation__SideBar.module.css'
import {NavLink} from "react-router-dom";

function Navigation__SideBar(props) {
    return (
        <div className={classes.body}>
            <div className={classes.item}>
                <NavLink to='/profile' onClick={() => (props.profileId.userId !== props.id) ? props.myProfile(props.id) : null}
                         className={i => i.isActive ? classes.active : classes.profile}>Profile</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to='/dialogs' className={i => i.isActive ? classes.active : classes.messages}>Messages</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to='/news' className={i => i.isActive ? classes.active : classes.news}>News</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to='/music' className={i => i.isActive ? classes.active : classes.music}>Music</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to='/findusers' className={i => i.isActive ? classes.active : classes.findusers}>Find users</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to='/settings' className={i => i.isActive ? classes.active : classes.settings}>Settings</NavLink>
            </div>
        </div>
    )
}

export default Navigation__SideBar