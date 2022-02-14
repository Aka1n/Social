import classes from './Dialogs.module.css'
import DialogsNames from "./DialogsNames/DialogsNames";
import DialogsMessages from "./DialogsMessages/DialogsMessages";
import {useDispatch, useSelector} from "react-redux";
import {addNewMessage, addNewMessageText} from "../../redux/dialogs-reducer";

function Dialogs() {

    const dialogsPage = useSelector(state => state.dialogsPage)
    const {dialogs} = dialogsPage
    const dispatch = useDispatch()

    return (
        <div className={classes.dialogs}>
            <div className={classes.title}></div>
            <div className={classes.body}>
                <DialogsNames names={dialogs} />
                <DialogsMessages dialogsPage={dialogsPage}
                                 addNewMessageText={text => dispatch(addNewMessageText(text))}
                                 addNewMessage={() => dispatch(addNewMessage())}/>
            </div>
        </div>
    )
}

export default Dialogs