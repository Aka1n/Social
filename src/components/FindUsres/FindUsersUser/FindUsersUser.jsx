import classes from './FindUsersUser.module.css'
import img from '../../../img/default-user.png'
import {NavLink} from "react-router-dom";

function Find_User__User(props) {

    return (
        <div className={classes.user}>
            <div className={classes.body}>
                <div className={classes.addfriend}>
                    <NavLink to={`/profile/${props.id}`}>
                        <img className={classes.avatar} src={(props.photos.small === null) ? img : props.photos.small } alt=""/>
                    </NavLink>
                    {(props.followed) ? <button disabled={props.userFollowLoading.some(userId => userId === props.id)}
                                                onClick={() => {props.unFollow(props.id)}}
                                                className={classes.button}>Un-follow</button>
                        : <button disabled={props.userFollowLoading.some(userId => userId === props.id)}
                                  onClick={() => {
                                      props.follow(props.id)}
                                  }
                                  className={classes.button}>Follow</button>  }
                </div>
                <div className={classes.info}>
                    <div className={classes.row}>
                        <div className={classes.name}>{props.name}</div>
                        <div className={classes.from}></div>
                    </div>
                    <div className={classes.status}>{props.status}</div>
                </div>
            </div>
        </div>
    )
}

export default Find_User__User