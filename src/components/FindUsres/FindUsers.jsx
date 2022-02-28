import {useDispatch, useSelector} from "react-redux";
import {
    getFollowThunk,
    getUnFollowThunk,
    setPage, getUsers, setSearchUsers, setPageNumber
} from "../../redux/findUsers-reducer";
import * as React from "react";
import FindUsersUser from "./FindUsersUser/FindUsersUser";
import classes from "./FindUsers.module.css";
import {useEffect, useMemo} from "react";
import Loading from "../../common/Loading/Loading";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretLeft, faCaretRight} from "@fortawesome/free-solid-svg-icons";
import NotFound from "../../common/NotFound/NotFound";


const FindUsers = () => {

    const findUsersPage = useSelector(state => state.findUsersPage)

    const dispatch = useDispatch()

    const {users ,totalPages, pageNumber, isLoading, userFollowLoading, searchUsers} = findUsersPage


    useMemo(() => {
        dispatch(setPageNumber(1))
    }, [searchUsers])


    useEffect(() => {
        dispatch(getUsers(users.length, pageNumber, searchUsers))
    }, [searchUsers])


    const AddUsers = ({users}) => useMemo(() => {

        if (users.length === 0) return <NotFound text="Users not found"/>

         return users.map(user => <FindUsersUser id={user.id}
                                         followed={user.followed}
                                         name={user.name}
                                         status={user.status}
                                         photos={user.photos}
                                         follow={id => dispatch(getFollowThunk(id))}
                                         unFollow={id => dispatch(getUnFollowThunk(id))}
                                         userFollowLoading={userFollowLoading}/>)
    },[])

    const addPagination = (totalPages) => {

        let mass = []

        for (let i =
            pageNumber === totalPages - 2 ? pageNumber - 2 :
                pageNumber === totalPages - 1 ? pageNumber - 3 :
                    pageNumber === totalPages ? pageNumber - 4 :
                        pageNumber >= 3 ? pageNumber - 2 :
                            pageNumber === 2 ? pageNumber - 1 :
                                pageNumber === 1? pageNumber : null; totalPages >= i; i++) {
            mass.push( <div onClick={() => dispatch(setPage(i, searchUsers))}
                            className={pageNumber === i ? `${classes.page} ${classes.active}` : classes.page}>{i}</div>)
            if (mass.length >= 5) {
                return mass.filter(page => page.props.children > 0)
            }
        }
        return mass
    }


    const debounce = (func, ms) => {
        let timeoutID
        return function () {
            const f = () => func.apply(this, arguments)
            clearTimeout(timeoutID)
            timeoutID = setTimeout(f, ms)
        }
    }

    return (
        <div className={classes.findusers}>
            <div className={classes.title}>Users</div>
            <input className={classes.search}
                   onChange={debounce((e) => dispatch(setSearchUsers(e.target.value)),500)}
                   placeholder="&#xf002;   Search..."/>
            <div className={classes.row}>
                {!isLoading ? <div className={classes.body}>{<AddUsers users={users}/>}</div> : <Loading/> }
                <div className={classes.pages}>
                    {pageNumber > 3 && totalPages >= 5 ? <FontAwesomeIcon className={classes.arrow}
                                                               onClick={() => dispatch(setPage(1, searchUsers))}
                                                               icon={faCaretLeft}/> : null}
                    {addPagination(totalPages)}
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

