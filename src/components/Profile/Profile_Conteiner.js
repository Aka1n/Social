import { useDispatch, useSelector } from 'react-redux';
import {
  addLike,
  addNewPostText,
  addPostActionCreator,
  myProfile,
  removeLike,
  setStatus
} from '../../redux/profile-reducer';
import * as React from 'react';
import { useCallback, useEffect } from 'react';
import { useMatch } from 'react-router-dom';
import classes from './Profile.module.css';
import img from '../../img/IMG_7219.JPG';
import Profile__data from './Profile__Data/Profile__data';
import Profile__MyPosts from './Profile__MyPosts/Profile__MyPosts';

const ProfilePage = () => {
  const userId = useMatch('profile/:userId/');
  const profilePage = useSelector(state => state.profilePage);
  const dispatch = useDispatch();
  const { profile, isLoading, status } = profilePage;

  useEffect(() => {
    dispatch(myProfile(userId));
  }, []);

  const setStatus = useCallback(() => dispatch(setStatus()), [])

  return (
      <div className={classes.profile}>
        <div className={classes.body}>
          <img src={img} alt="" className={classes.img} />
          <Profile__data profile={profile}
                         isLoading={isLoading}
                         status={status}
                         setStatus={setStatus} />
          <Profile__MyPosts profilePage={profilePage}
                            addNewPostText={text => dispatch(addNewPostText(text))}
                            addPostActionCreator={() => dispatch(addPostActionCreator())}
                            addLike={id => dispatch(addLike(id))}
                            removeLike={id => dispatch(removeLike(id))} />
        </div>
      </div>
  );
};

export default ProfilePage;
