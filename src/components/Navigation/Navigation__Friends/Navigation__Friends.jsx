import classes from './Navigation__Friends.module.css'
import Navigation__Friend from "./Navigation__Friend/Navigation__Friend";

function Navigation__Friends(props) {
    return (
        <div className={classes.friends}>
            <div className={classes.title}>Friends</div>
                <div className={classes.body}>
                    {Navigation__Friend(props.friends)}
            </div>
        </div>
    )
}

export default Navigation__Friends
