import classes from './NavigationSideBar.module.css'
import {NavLink} from "react-router-dom";
import {FC} from "react";

type Props = {
    userId: any
}

const NavigationSideBar: FC<Props> = ({userId}) => (

    <div className={classes.body}>
        <div className={classes.item}>
            <NavLink to='/profile' className={i => i.isActive ? classes.active : classes.profile}>Profile</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to={!userId ? '/dialogs' : `/dialogs/${userId}`}
                     className={i => i.isActive ? classes.active : classes.messages}>Messages</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to='/news' className={i => i.isActive ? classes.active : classes.news}>News</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to='/music' className={i => i.isActive ? classes.active : classes.music}>Music</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to='/findusers' className={i => i.isActive ? classes.active : classes.findusers}>Find
                users</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to='/settings' className={i => i.isActive ? classes.active : classes.settings}>Settings</NavLink>
        </div>
    </div>
);

export default NavigationSideBar