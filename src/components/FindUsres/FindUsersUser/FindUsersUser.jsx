import classes from './FindUsersUser.module.css'
import img from '../../../img/default-user.png'
import {NavLink} from "react-router-dom";
import {addDialog} from "../../../redux/dialogs-reducer";
import {useDispatch} from "react-redux";

function FindUsersUser(props) {

    const dispatch = useDispatch()

    return (
        <div className={classes.user}>
            <div className={classes.body}>
                <div className={classes.addfriend}>
                    <NavLink to={`/profile/${props.id}`}>
                        <img className={classes.avatar}
                             src={(props.photos.small === null) ? img : props.photos.small } alt=""/>
                    </NavLink>
                    <div>
                    {(props.followed)
                        ? <button disabled={props.userFollowLoading.some(userId => userId === props.id)}
                                                onClick={() => {props.followUnFollow(props.id, props.followed)}}
                                                className={classes.button}>Un-follow</button>
                        : <button disabled={props.userFollowLoading.some(userId => userId === props.id)}
                                  onClick={() => {
                                      props.followUnFollow(props.id, props.followed)}
                                  }
                                  className={classes.button}>Follow</button> }
                        <NavLink to={`/dialogs/${props.id}`} onClick={() => dispatch(addDialog(props.id))} >
                            <button className={classes.button}>Message</button>
                        </NavLink>
                    </div>
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

export default FindUsersUser