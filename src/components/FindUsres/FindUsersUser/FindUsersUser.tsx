import classes from './FindUsersUser.module.css'
import img from '../../../img/default-user.png'
import {NavLink} from "react-router-dom";
import {FC} from "react";
import {PhotosType} from "../../../types/types";

type Props = {
    id: number,
    photos: PhotosType
    followed: boolean
    userFollowLoading: Array<number>
    followUnFollow: (id: number, follow: boolean) => Promise<void>
    name: string
    status: string | null
    addDialog: (userId: number) => Promise<void>

}

const FindUsersUser:FC<Props> = ({id, photos, followed, userFollowLoading,
                                     followUnFollow, name, status, addDialog}) => {

    return (
        <div className={classes.user}>
            <div className={classes.body}>
                <div className={classes.addfriend}>
                    <NavLink to={`/profile/${id}`}>
                        <img className={classes.avatar}
                             src={(photos.small === null) ? img : photos.small } alt=""/>
                    </NavLink>
                    <div>
                    {(followed)
                        ? <button disabled={userFollowLoading.some(userId => userId === id)}
                                                onClick={() => {followUnFollow(id, followed)}}
                                                className={classes.button}>Un-follow</button>
                        : <button disabled={userFollowLoading.some(userId => userId === id)}
                                  onClick={() => {
                                      followUnFollow(id, followed)}
                                  }
                                  className={classes.button}>Follow</button> }
                        <NavLink to={`/dialogs/${id}`} onClick={() => addDialog(id)} >
                            <button className={classes.button}>Message</button>
                        </NavLink>
                    </div>
                </div>
                <div className={classes.info}>
                    <div className={classes.row}>
                        <div className={classes.name}>{name}</div>
                        <div className={classes.from}></div>
                    </div>
                    <div className={classes.status}>{status}</div>
                </div>
            </div>
        </div>
    )
}

export default FindUsersUser