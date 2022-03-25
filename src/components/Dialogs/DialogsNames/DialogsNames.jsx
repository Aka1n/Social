import {NavLink} from "react-router-dom";
import classes from './DialogsNames.module.css'
import {useEffect, useMemo} from "react";
import {getDialogs} from "../../../redux/dialogs-reducer";
import {useDispatch, useSelector} from "react-redux";
import Loading from "../../../common/Loading/Loading";


function DialogsNames(props) {

    const dialogsPage = useSelector(state => state.dialogsPage)
    const {dialogs, isLoading} = dialogsPage

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDialogs())
    },[])

    let Names = ({names}) => useMemo(() => {
        return names.map((name) =>
            <NavLink to={'/dialogs/'+ name.id}
                     onClick={() => {
                         props.getMessages(name.id)
                         props.setUserId(name.id)
                     }}
                     className={e => e.isActive
                         ? `${classes.name} ${classes.active}`
                         : classes.name}>{name.userName}
            </NavLink>)
    },[dialogs])

    if (isLoading) return <Loading/>

    return (
        <div className={classes.names}>
            <div className={classes.body}>
                    <Names names={props.names}/>
            </div>
        </div>
    )

}

export default DialogsNames