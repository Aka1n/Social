import {useDispatch, useSelector} from "react-redux";
import {
    getFollowThunk,
    getUnFollowThunk,
    setPage, getUsers
} from "../../redux/findUsers-reducer";
import * as React from "react";
import FindUser_User from "./FindUsersUser/FindUsersUser";
import classes from "./FindUsers.module.css";
import {useEffect} from "react";
import Loading from "../../common/Loading/Loading";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretLeft, faCaretRight} from "@fortawesome/free-solid-svg-icons";


const FindUsers = () => {

    const findUsersPage = useSelector(state => state.findUsersPage)

    const dispatch = useDispatch()

    const {users ,totalPages, pageNumber, isLoading, userFollowLoading} = findUsersPage

    useEffect(() => dispatch(getUsers(users.length, pageNumber)), [])

    const AddUsers = () => users.map(user => <FindUser_User id={user.id}
                                                              followed={user.followed}
                                                              name={user.name}
                                                              status={user.status}
                                                              photos={user.photos}
                                                              follow={id => dispatch(getFollowThunk(id))}
                                                              unFollow={id => dispatch(getUnFollowThunk(id))}
                                                              userFollowLoading={userFollowLoading}/>)

    const addPagination = totalPages => {

        let mass = []

        for (let i =
            pageNumber === totalPages - 2 ? pageNumber - 2 :
                pageNumber === totalPages - 1 ? pageNumber - 3 :
                    pageNumber === totalPages ? pageNumber - 4 :
                        pageNumber >= 3 ? pageNumber - 2 :
                            pageNumber === 2 ? pageNumber - 1 :
                                pageNumber === 1? pageNumber : null; totalPages >= i; i++) {
            mass.push(<div onClick={() => dispatch(setPage(i))}
                           className={pageNumber === i ? `${classes.page} ${classes.active}` : classes.page}>{i}</div>)

            if (mass.length >= 5) {
                return mass
            }
        }
    }


    return (
        <div className={classes.findusers}>
            <div className={classes.title}>Users</div>
            <div className={classes.row}>
                {!isLoading ? <div className={classes.body}>{AddUsers(users)}</div> : <Loading/> }
                <div className={classes.pages}>
                    {pageNumber > 3 ? <FontAwesomeIcon className={classes.arrow}
                                                               onClick={() => dispatch(setPage(1))}
                                                               icon={faCaretLeft}/> : null}
                    {addPagination(totalPages)}
                    {pageNumber < totalPages - 2 ? <FontAwesomeIcon className={classes.arrow}
                                                                                  onClick={() => dispatch(setPage(totalPages))}
                                                                                  icon={faCaretRight}/> : null}
                </div>
            </div>
        </div>
    )
}

export default FindUsers

