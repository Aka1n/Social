import classes from './Navigation.module.css'
import Navigation__SideBar from "./Navigation__SideBar/Navigation__SideBar";
import Navigation__Friends from "./Navigation__Friends/Navigation__Friends";


function Navigation(props) {
    return (
        <div className={classes.back}>
            <div className={classes.navigation}>
                <Navigation__SideBar myProfile={props.myProfile} id={props.id} profileId={props.profileId}/>
                <Navigation__Friends friends={props.navigation.friends} />
            </div>
        </div>
    )
}

export default Navigation