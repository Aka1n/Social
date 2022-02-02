import classes from './NavigationFriends.module.css'
import NavigationFriend from "./NavigationFriend/NavigationFriend";

function NavigationFriends(props) {
    return (
        <div className={classes.friends}>
            <div className={classes.title}>Friends</div>
                <div className={classes.body}>
                    {NavigationFriend(props.friends)}
            </div>
        </div>
    )
}

export default NavigationFriends
