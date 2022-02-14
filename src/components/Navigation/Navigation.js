import { useDispatch, useSelector } from 'react-redux';
import { myProfile } from '../../redux/navigation-reducer';
import classes from './Navigation.module.css';
import NavigationSideBar from './NavigationSideBar/NavigationSideBar';
import NavigationFriends from './NavigationFriends/NavigationFriends';

function Navigation() {

  const state = useSelector((state) => ({
    navigation: state.navigation,
    id: state.auth.user.id,
    profileId: state.profilePage.profile,
  }));

  const dispatch = useDispatch();

  return (
    <div className={classes.back}>
      <div className={classes.navigation}>
        <NavigationSideBar
          myProfile={(id) => dispatch(myProfile(id))}
          id={state.id}
          profileId={state.profileId}
        />
        <NavigationFriends friends={state.navigation.friends} />
      </div>
    </div>
  );
}

export default Navigation;
