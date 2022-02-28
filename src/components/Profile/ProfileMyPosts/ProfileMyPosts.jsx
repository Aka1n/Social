import classes from "./ProfileMyPosts.module.css";
import ProfilePost from "./ProfilePost/ProfilePost.jsx";
import ProfileTextarea from "./ProfileTextarea/ProfileTextarea";
import {useMemo} from "react";

const ProfileMyPosts = (props) => useMemo(() => {

  const Posts = ({posts}) => posts.map((el) => (
      <ProfilePost
          likes={el.likes}
          message={el.text}
          liked={el.liked}
          id={el.id}
          addLike={props.addLike}
          removeLike={props.removeLike}
      />
  ));

  return (
      <div className={classes.myPosts}>
        <div className={classes.body}>
          <div className={classes.title}>My posts</div>
          <ProfileTextarea
              profilePage={props.profilePage}
              addNewPostText={props.addNewPostText}
              addPostActionCreator={props.addPostActionCreator}
          />
          {<Posts posts={props.profilePage.posts}/>}
        </div>
      </div>
  );
},[props.profilePage.newPostChange, props.profilePage.posts])

export default ProfileMyPosts;
