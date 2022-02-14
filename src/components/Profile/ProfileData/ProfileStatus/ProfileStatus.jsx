import classes from './ProfileStatus.module.css'
import * as React from "react";
import {useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch} from "react-redux";
import {getStatus} from "../../../../redux/profile-reducer";
import LoadingMin from "../../../../common/Loading/LoadingMin";


const ProfileStatus = props => {

    const [editMode, setMode] = useState(false)
    const [status, setStatus] = useState(props.status)
    const [isLoading, setLoading] = useState(true)

    const dispatch = useDispatch()

    const id = useMemo(() => !props.id ? props.me : +props.id.params.userId, [])

    const statusUp = useCallback(id => getStatus(id), [])

    useEffect(() => {

        let cleanupFunction = false;

        dispatch(statusUp(id)).then(() => {
            if (!cleanupFunction) {
                setStatus(props.status)
                setLoading(false)
            }})
        
            return () => cleanupFunction = true

    }, [props.status])

    const disabledStatus = () => {
        setMode(false)
        setLoading(true)
        props.setStatus(status).then(() => setLoading(false))
    }

    const includedStatus = () => setMode(true)

    const onChangeStatus = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div className={classes.status}>
            {!editMode ? <div className={id === props.me ? classes.hover : classes.body}>
                    <div className={!isLoading ? classes.text : `${classes.text} ${classes.loading}` }
                         onDoubleClick={id === props.me? includedStatus : null}>
                        {(!props.status && !props.id && id === props.me ? 'write your status...' : props.status)}</div>
                    {isLoading && <LoadingMin/>}
                </div> :
                <input value={!status ? '' : status}
                       onChange={onChangeStatus}
                       className={classes.input}
                       onBlur={disabledStatus} autoFocus/>}
        </div>
    )
}


export default ProfileStatus