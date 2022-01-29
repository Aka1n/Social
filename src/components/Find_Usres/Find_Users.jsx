import classes from './Find_Users.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCaretLeft, faCaretRight} from "@fortawesome/free-solid-svg-icons";
import Loading from "../../common/Loading/Loading";

function Find_Users(props) {
    return (
        <div className={classes.findusers}>
            <div className={classes.title}>Users</div>
            <div className={classes.row}>
                {(!props.loading) ? <div className={classes.body}>{props.AddUsers(props.users)}</div> : <Loading/> }
                <div className={classes.pages}>
                    {(props.pageNumber > 3) ? <FontAwesomeIcon className={classes.arrow}
                                                               onClick={() => props.page(1)}
                                                               icon={faCaretLeft}/> : null}
                    {props.addPages(props.totalPages)}
                    {(props.pageNumber < props.totalPages - 2) ? <FontAwesomeIcon className={classes.arrow}
                                                                                  onClick={() => props.page(props.totalPages)}
                                                                                  icon={faCaretRight}/> : null}
                </div>
            </div>
        </div>
    )
}

export default Find_Users