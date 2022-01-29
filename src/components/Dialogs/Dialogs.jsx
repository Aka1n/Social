import classes from './Dialogs.module.css'
import Dialogs__Names from "./Dialogs__Names/Dialogs__Names";
import Dialogs__Messages from "./Dialogs__Messages/Dialogs__Messages";
import {addNewMessage, addNewMessageText} from "../../redux/dialogs-reducer";

function Dialogs(props) {
    return (
        <div className={classes.dialogs}>
            <div className={classes.title}></div>
            <div className={classes.body}>
                <Dialogs__Names names={props.dialogsPage.dialogs} />
                <Dialogs__Messages dialogsPage={props.dialogsPage}
                                   addNewMessageText={props.addNewMessageText}
                                   addNewMessage={props.addNewMessage}/>
            </div>
        </div>
    )
}

export default Dialogs