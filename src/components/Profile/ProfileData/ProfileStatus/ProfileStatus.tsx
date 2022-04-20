import classes from './ProfileStatus.module.css'
import * as React from "react";
import {FC, useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch} from "react-redux";
import {getStatus} from "../../../../redux/profile-reducer";
import LoadingMin from "../../../../common/Loading/LoadingMin";
import {AppDispatch} from "../../../../redux/redux-store";

type Props = {
    me: number | null
    id: string | null | undefined
    status: string
    setStatus: (status: any) => Promise<void>
    isLoading: boolean
}

const ProfileStatus: FC<Props> = ({me, id, status, setStatus ,isLoading}) => {

    const [editMode, setMode] = useState(false)
    const [statusCache, setStatusCache] = useState(status)
    const [loading, setLoading] = useState(true)

    const dispatch: AppDispatch = useDispatch()

    const userId = useMemo(() => !id ? me : +id, [])

    const statusUp = useCallback(id => getStatus(id), [])

    useEffect(   () => {

        let cancel = false as boolean;

        (async function () {
            await dispatch(statusUp(userId))
            if (cancel) return
            setStatusCache(status)
            setLoading(false)
        })()

        return () => {cancel = true}

    }, [status])

    const disabledStatus = () => {
        setMode(false)
        setLoading(true)
        setStatus(statusCache).then(() => setLoading(false))
    }

    return (
        <div className={classes.status}>
            {!editMode ? <div className={userId === me ? classes.hover : classes.body}>
                    <div className={!loading ? classes.text : `${classes.text} ${classes.loading}` }
                         onDoubleClick={() => userId === me ? setMode(true) : null}>
                        {(!status && !id && userId === me ? 'write your status...' : status)}</div>
                    {loading && <LoadingMin/>}
                </div> :
                <input value={!status ? '' : statusCache}
                       onChange={(e) => setStatusCache(e.currentTarget.value)}
                       className={classes.input}
                       onBlur={disabledStatus} autoFocus/>}
        </div>
    )
}


export default ProfileStatus