import {useDispatch, useSelector} from "react-redux";
import {
    getFollowThunk,
    setPage, getUsers, setSearchUsers, setPageNumber,
} from "../../redux/findUsers-reducer";
import * as React from "react";
import FindUsersUser from "./FindUsersUser/FindUsersUser";
import classes from "./FindUsers.module.css";
import {ChangeEvent, FC, useEffect, useMemo, useState} from "react";
import Loading from "../../common/Loading/Loading";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretLeft, faCaretRight} from "@fortawesome/free-solid-svg-icons";
import NotFound from "../../common/NotFound/NotFound";
import Pagination from "./Pagination";
import {AppDispatch, RootState} from "../../redux/redux-store";
import {UserType} from "../../types/types";
import {addDialog} from "../../redux/dialogs-reducer";

type Users = {
    users: Array<UserType>
}

const FindUsers:FC = () => {

    const findUsersPage = useSelector((state: RootState) => state.findUsersPage)

    const dispatch: AppDispatch = useDispatch()

    const {users ,totalPages, pageNumber, isLoading, userFollowLoading, searchUsers} = findUsersPage

    const [text, setText] = useState(searchUsers)


    useMemo(() => {
        dispatch(setPageNumber(1))
    }, [searchUsers])


    useEffect(() => {
        dispatch(getUsers(users.length, pageNumber, searchUsers))
    }, [searchUsers])


    const AddUsers:FC<Users> = ({users}) => useMemo(() => {

        if (users.length === 0) return <NotFound text="Users not found"/>

         return (
             <>{
                 users.map((user) => <FindUsersUser id={user.id}
                                                    key={user.id}
                                                    followed={user.followed}
                                                    name={user.name}
                                                    status={user.status}
                                                    photos={user.photos}
                                                    userFollowLoading={userFollowLoading}
                                                    addDialog={(userId: number) => dispatch(addDialog(userId))}
                                                    followUnFollow={
                                                        (id: number, follow: boolean) => dispatch(getFollowThunk(id, follow))}/>)
             }</>
         )
    },[searchUsers])

    const debounceOnChange = (func: (e: ChangeEvent<HTMLInputElement>) => void, ms: number) => useMemo(() => {
        let timeoutID: ReturnType<typeof setTimeout>
        return function (...args: any) {
            setText(args[0].target.value)
            clearTimeout(timeoutID)
            const f = () => func.apply(this, args)
            timeoutID = setTimeout(f, ms)
        }
    },[])


    return (
        <div className={classes.findUsers}>
            <div className={classes.title}>Users</div>
            <input className={classes.search}
                   onChange={debounceOnChange((e) => dispatch(setSearchUsers(e.target.value)),500)}
                   value={text}
                placeholder="&#xf002;   Search..."/>
            <div className={classes.row}>
                {!isLoading ? <div className={classes.body}>{<AddUsers users={users}/>}</div> : <Loading/> }
                <div className={classes.pages}>
                    {pageNumber > 3 && totalPages >= 5 ? <FontAwesomeIcon className={classes.arrow}
                                                               onClick={() => dispatch(setPage(1, searchUsers))}
                                                               icon={faCaretLeft}/> : null}
                    <Pagination pageNumber={pageNumber}
                                totalPages={totalPages}
                                setPage={setPage}
                                searchUsers={searchUsers}
                                dispatch={dispatch}/>
                    {pageNumber < totalPages - 2 && totalPages >= 5
                        ? <FontAwesomeIcon className={classes.arrow}
                                           onClick={() => dispatch(setPage(totalPages, searchUsers))}
                                           icon={faCaretRight}/> : null}
                </div>
            </div>
        </div>
    )
}

export default FindUsers

