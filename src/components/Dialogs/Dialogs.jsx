import classes from './Dialogs.module.css'
import DialogsNames from "./DialogsNames/DialogsNames";
import DialogsMessages from "./DialogsMessages/DialogsMessages";
import {useDispatch, useSelector} from "react-redux";
import {addNewMessageText, getMessages, setMessage, setUserId} from "../../redux/dialogs-reducer";

function Dialogs() {

    const dialogsPage = useSelector(state => state.dialogsPage)
    const {dialogs, userId} = dialogsPage
    const dispatch = useDispatch()
    
    return (
        <div className={classes.dialogs}>
            <div className={classes.title}></div>
            <div className={classes.body}>
                <DialogsNames names={dialogs}
                              getMessages={userId => dispatch(getMessages(userId))}
                              setUserId={userId => dispatch(setUserId(userId))}
                />
                <DialogsMessages dialogsPage={dialogsPage}
                                 userId={userId}
                                 addNewMessageText={text => dispatch(addNewMessageText(text))}
                                 addNewMessage={(userId, message) => dispatch(setMessage(userId, message))}
                />
            </div>
        </div>
    )
}

export default Dialogs