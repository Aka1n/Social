import {NavLink} from "react-router-dom";
import classes from './DialogsNames.module.css'
import {FC, useEffect, useMemo} from "react";
import defaultImg from "../../../img/default-user.png"
import {DialogType} from "../../../types/types";

type Props = {
    names: Array<DialogType>
    getMessages: (userId: number) => void
    setUserId: (userId: number) => void
    getDialogs: () => void
}

type Names = {
    names: Array<DialogType>
}

const DialogsNames: FC<Props> = ({names, getMessages, setUserId, getDialogs}) => {

    useEffect(() => {
        getDialogs()
    },[])

    const Names: FC<Names> = ({names}) => useMemo(() => {
        return (
            <>{
                names.map((name) =>
                    <NavLink to={'/dialogs/'+ name.id}
                             key={name.id}
                             onClick={() => {
                                 // props.getMessages(name.id)
                                 setUserId(name.id)
                             }}
                             className={e => e.isActive
                                 ? `${classes.name} ${classes.active}`
                                 : classes.name}>
                        <img className={classes.avatar} src={name.photos.small ? name.photos.small : defaultImg} alt=""/>
                        {name.userName}
                    </NavLink>)
            }</>
        )
    },[names])

    return (
        <div className={classes.dialogs}>
            <div className={classes.body}>
                <div className={classes.names}>
                    <NavLink className={e => e.isActive
                        ? `${classes.name} ${classes.active}`
                        : classes.name} to={'/dialogs/common'}>
                        <img className={classes.avatar} src={defaultImg} alt=""/>
                        Common dialog</NavLink>
                    <Names names={names}/>
                </div>
            </div>
        </div>
    )

}

export default DialogsNames