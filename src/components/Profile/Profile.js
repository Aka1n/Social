import { useDispatch, useSelector } from 'react-redux';
import * as React from 'react';
import { useCallback, useEffect } from 'react';
import { useMatch } from 'react-router-dom';
import {
  addLike,
  addNewPostText,
  addPostActionCreator,
  myProfile,
  removeLike,
  setStatus,
} from '../../redux/profile-reducer';
import classes from './Profile.module.css';
import img from '../../img/IMG_7219.JPG';
import ProfileData from './ProfileData/ProfileData';
import ProfileMyPosts from './ProfileMyPosts/ProfileMyPosts';
import { withRedirect } from '../../hoc/withRedirect';

function ProfilePage() {
  const userId = useMatch('profile/:userId/');
  const profilePage = useSelector((state) => state.profilePage);
  const id = useSelector((state) => state.auth.id);
  const dispatch = useDispatch();
  const { profile, isLoading, status } = profilePage;

  useEffect(() => {
    dispatch(myProfile(userId));
  }, []);

  const getStatus = useCallback((status) => dispatch(setStatus(status)), []);

  return (
    <div className={classes.profile}>
      <div className={classes.body}>
        <img src={img} alt="" className={classes.img} />
        <ProfileData
          profile={profile}
          isLoading={isLoading}
          status={status}
          setStatus={getStatus}
          id={userId}
          me={id}
        />

        <ProfileMyPosts
          profilePage={profilePage}
          addNewPostText={(text) => dispatch(addNewPostText(text))}
          addPostActionCreator={() => dispatch(addPostActionCreator())}
          addLike={(id) => dispatch(addLike(id))}
          removeLike={(id) => dispatch(removeLike(id))}
        />
      </div>
    </div>
  );
}

export default withRedirect(ProfilePage);
