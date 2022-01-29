import classes from './Profile.module.css'
import img from '../../img/IMG_7219.JPG'
import Profile__data from "./Profile__Data/Profile__data";
import Profile__MyPosts from "./Profile__MyPosts/Profile__MyPosts";

function Profile(props) {
    return (
        <div className={classes.profile}>
            <div className={classes.body}>
                <img src={img} alt="" className={classes.img}/>
                <Profile__data profile={props.profile}
                               isLoading={props.isLoading}
                               status={props.status}
                               setStatus={props.setStatus}/>
                <Profile__MyPosts profilePage={props.profilePage}
                                  addNewPostText={props.addNewPostText}
                                  addPostActionCreator={props.addPostActionCreator}
                                  addLike={props.addLike}
                                  removeLike={props.removeLike}/>
            </div>
        </div>
    )
}

export default Profile