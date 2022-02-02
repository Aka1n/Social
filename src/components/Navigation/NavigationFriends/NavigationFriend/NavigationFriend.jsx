import classes from '../NavigationFriends.module.css'

function NavigationFriend(friends) {
    return friends.map(el => <div className={classes.item}>
        <div className={classes.avatar}></div>
        <div className={classes.name}>{el.name}</div>
    </div>)
}

export default NavigationFriend