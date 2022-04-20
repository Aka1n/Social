import classes from "./ProfileMyPosts.module.css";
import ProfilePost from "./ProfilePost/ProfilePost";
import ProfileTextarea from "./ProfileTextarea/ProfileTextarea";
import {FC, useMemo} from "react";
import * as React from "react";
import {PostType} from "../../../types/types";
import {Action} from "redux";

type Props = {
    posts: Array<PostType>
    newPostChange: string
    addNewPostText: (text: string) => Action
    addPostActionCreator: () => Action
    addLike: (id: number) => Action
    removeLike: (id: number) => Action
}


const ProfileMyPosts: FC<Props> = ({posts, newPostChange,  addNewPostText, addPostActionCreator,
                                addLike, removeLike}) => useMemo(() => {

  const Posts: FC<{posts: Array<PostType>}> = ({posts}) =>
       <>{
          posts.map((el) => (
              <ProfilePost
                  likes={el.likes}
                  message={el.text}
                  liked={el.liked}
                  id={el.id}
                  addLike={addLike}
                  removeLike={removeLike}
              />
          ))
      }</>
  ;

  return (
      <div className={classes.myPosts}>
        <div className={classes.body}>
          <div className={classes.title}>My posts</div>
          <ProfileTextarea
              newPostChange={newPostChange}
              addNewPostText={addNewPostText}
              addPostActionCreator={addPostActionCreator}
          />
          <Posts posts={posts}/>
        </div>
      </div>
  );
},[newPostChange, posts])

export default ProfileMyPosts;
