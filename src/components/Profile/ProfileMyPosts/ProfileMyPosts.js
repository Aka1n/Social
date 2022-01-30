import classes from './Profile__MyPosts.module.css'
import ProfilePost from "./ProfilePost/ProfilePost";
import ProfileTextarea from "./ProfileTextarea/ProfileTextarea";

function ProfileMyPosts(props) {

    let Posts = (posts) => posts.map(el => <ProfilePost likes={el.likes}
                                                        message={el.text}
                                                        liked={el.liked}
                                                        id={el.id}
                                                        addLike={props.addLike}
                                                        removeLike={props.removeLike}/>)

    return (
        <div className={classes.myPosts}>
            <div className={classes.body}>
                <div className={classes.title}>My posts</div>
                <ProfileTextarea profilePage={props.profilePage}
                                 addNewPostText={props.addNewPostText}
                                 addPostActionCreator={props.addPostActionCreator}
                />
                {Posts(props.profilePage.posts)}
            </div>
        </div>
    )
}

export default ProfileMyPosts