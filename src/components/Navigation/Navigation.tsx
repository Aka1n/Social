import { useDispatch, useSelector } from "react-redux";
import {myProfile, setActive} from "../../redux/navigation-reducer";
import classes from "./Navigation.module.css";
import NavigationSideBar from "./NavigationSideBar/NavigationSideBar";
import NavigationFriends from "./NavigationFriends/NavigationFriends";
import {FC} from "react";
import {AppDispatch, RootState} from "../../redux/redux-store";

const Navigation: FC = () => {

  const userId = useSelector((state: RootState) => state.dialogsPage.userId)
  const isActive = useSelector((state: RootState) => state.navigation.isActive)
  const friends = useSelector((state: RootState) => state.navigation.friends)

  const dispatch: AppDispatch = useDispatch();

  return (
    <div className={ !isActive ? classes.back : `${classes.back} ${classes.back_active}`}
         onClick={() => dispatch(setActive(false))}
    >
      <div className={!isActive ? classes.navigation : `${classes.navigation} ${classes.active}`}>
        <NavigationSideBar userId={userId}/>
        <NavigationFriends friends={friends} />
      </div>
    </div>
  );
};

export default Navigation;
