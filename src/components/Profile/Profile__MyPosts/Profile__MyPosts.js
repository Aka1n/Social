import classes from './Profile__MyPosts.module.css'
import Profile__Post from "./Profile__Post/Profile__Post";
import Profile__Textarea from "./Profile__Textarea/Profile__Textarea";

function Profile__MyPosts(props) {

    let Posts = (posts) => posts.map(el => <Profile__Post likes={el.likes}
                                                          message={el.text}
                                                          liked={el.liked}
                                                          id={el.id}
                                                          addLike={props.addLike}
                                                          removeLike={props.removeLike}/>)

    return (
        <div className={classes.myPosts}>
            <div className={classes.body}>
                <div className={classes.title}>My posts</div>
                <Profile__Textarea profilePage={props.profilePage}
                                   addNewPostText={props.addNewPostText}
                                   addPostActionCreator={props.addPostActionCreator}
                />
                {Posts(props.profilePage.posts)}
            </div>
        </div>
    )
}

export default Profile__MyPosts