import {NavLink} from "react-router-dom";
import classes from './DialogsNames.module.css'


function DialogsNames(props) {

    let names = (names) => {
        return names.map((name) =>
            <NavLink to={'/dialogs/'+ name.id}
                     className={e => e.isActive
                             ? `${classes.name} ${classes.active}`
                             : classes.name}>{name.name}
            </NavLink>)
    }

    return (
        <div className={classes.names}>
            <div className={classes.body}>
                {names(props.names)}
            </div>
        </div>
    )

}

export default DialogsNames