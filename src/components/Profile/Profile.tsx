import { useDispatch, useSelector } from "react-redux";
import * as React from "react";
import {FC, useCallback, useEffect} from "react";
import { useMatch } from "react-router-dom";
import {
  addLike,
  addNewPostText,
  addPost,
  myProfile,
  removeLike,
  setStatus,
} from "../../redux/profile-reducer";
import classes from "./Profile.module.css";
import img from "../../img/IMG_7219.jpg";
import ProfileData from "./ProfileData/ProfileData";
import ProfileMyPosts from "./ProfileMyPosts/ProfileMyPosts";
import {AppDispatch, RootState} from "../../redux/redux-store";


const ProfilePage: FC = () => {

  const match = useMatch("profile/:userId");
  const profilePage = useSelector((state: RootState) => state.profilePage);
  const id = useSelector((state: RootState) => state.auth.user.id);
  const dispatch: AppDispatch = useDispatch();
  const { profile, isLoading, status, posts, newPostChange } = profilePage;

  useEffect(() => {
    if (match) dispatch(myProfile(match.params.userId))
    else dispatch(myProfile(undefined))
  }, [match]);

  const getStatus = useCallback((status: string) => dispatch(setStatus(status)), []);

  return (
    <div className={classes.profile}>
      <div className={classes.body}>
        <img src={img} alt="" className={classes.img} />
        <ProfileData
          profile={profile}
          isLoading={isLoading}
          status={status}
          setStatus={getStatus}
          id={match ? match.params.userId : null}
          me={id}
        />

        <ProfileMyPosts
          posts={posts}
          newPostChange={newPostChange}
          addNewPostText={(text: string) => dispatch(addNewPostText(text))}
          addPostActionCreator={() => dispatch(addPost())}
          addLike={(id: number) => dispatch(addLike(id))}
          removeLike={(id: number) => dispatch(removeLike(id))}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
