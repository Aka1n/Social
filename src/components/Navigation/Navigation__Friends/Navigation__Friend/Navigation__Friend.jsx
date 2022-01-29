import classes from '../Navigation__Friends.module.css'

function Navigation__Friend(friends) {
    return friends.map(el => <div className={classes.item}>
        <div className={classes.avatar}></div>
        <div className={classes.name}>{el.name}</div>
    </div>)
}

export default Navigation__Friend