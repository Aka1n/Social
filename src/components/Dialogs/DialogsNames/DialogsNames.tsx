import {NavLink, PathMatch} from "react-router-dom";
import classes from './DialogsNames.module.css'
import {FC, useEffect, useMemo} from "react";
import defaultImg from "../../../img/default-user.png"
import {DialogType} from "../../../types/types";

type Props = {
    names: Array<DialogType>
    getMessages: (userId: number) => void
    setUserId: (userId: number) => void
    getDialogs: () => void
    match:  PathMatch | null
    device: string
}

type Names = {
    names: Array<DialogType>
}

const DialogsNames: FC<Props> = ({names, setUserId, getDialogs, match, device}) => {

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
    },[])


    if (match && device === 'Mobile') {
        return (<></>)
    }

    return (
        <div className={!match && device === 'Mobile' ? classes.dialogsMobile : classes.dialogs}>
            <div className={!match && device === 'Mobile' ? classes.bodyMobile : classes.body}>
                <div className={!match && device === 'Mobile' ? classes.namesMobile : classes.names}>
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