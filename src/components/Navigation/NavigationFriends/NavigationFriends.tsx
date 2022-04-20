import classes from './NavigationFriends.module.css'
import {FC} from "react";
import {FriendType} from "../../../types/types";

type Props = {
    friends: Array<FriendType>
}

const NavigationFriends: FC<Props> = ({friends}) => {

    const NavigationFriend: FC<Props> = ({friends}) => (
        <>{
            friends.map((el, index) => <div className={classes.item} key={index}>
                <div className={classes.avatar}/>
                <div className={classes.name}>{el.name}</div>
            </div>)
        }</>
    );

    return (
        <div className={classes.friends}>
            <div className={classes.title}>Friends</div>
            <div className={classes.body}>
                <NavigationFriend friends={friends} />
            </div>
        </div>
    )
}

export default NavigationFriends
