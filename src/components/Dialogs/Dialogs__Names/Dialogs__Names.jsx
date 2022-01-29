import {NavLink} from "react-router-dom";
import classes from './Dialogs_Names.module.css'


function Dialogs__Names(props) {

    let names = (names) => {
        return names.map((name) => <NavLink to={'/dialogs/'+ name.id}
                                            className={(e) => e.isActive ? `${classes.name} ${classes.active}` : classes.name}>{name.name}</NavLink>)
    }

    return (
        <div className={classes.names}>
            <div className={classes.body}>
                {names(props.names)}
            </div>
        </div>
    )

}

export default Dialogs__Names