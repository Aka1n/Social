import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import classes from './Profile__Post.module.css'
import avatar from '../../../../img/IMG_7839.JPG'



function Profile__Post(props) {

    let addLike = () => props.addLike(props.id)
    let removeLike = () => props.removeLike(props.id)

    return (
        <div className={classes.post}>
            <div className={classes.body}>
                <div className={classes.avatar}>
                    <img src={avatar} alt=""/>
                </div>
                <div className={classes.item}>
                    <div className={classes.text}>{props.message}</div>
                    <div className={classes.like}>
                        {(props.liked) ? <FontAwesomeIcon onClick={removeLike} className={`${classes.icon} ${classes.active}`} icon={faHeart}/>
                        : <FontAwesomeIcon onClick={addLike} className={classes.icon} icon={faHeart}/>}
                        <div className={classes.likes}>{props.likes}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile__Post