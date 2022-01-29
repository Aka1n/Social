import classes from './Dialogs__Messages.module.css'
import Dialogs__TextArea from "./Dialogs__TextArea/Dialogs__TextArea";

let messages = (messages) => {
    return messages.map(el => <div className={classes.item}>
        <div className={classes.message}>{el.message}</div>
    </div>)
}

function Dialogs__Messages(props) {
    return (
        <div className={classes.messages}>
            <div className={classes.body}>
                {messages(props.dialogsPage.messages)}
            </div>
            <Dialogs__TextArea newMessageText={props.dialogsPage.newMessageText}
                               addNewMessageText={props.addNewMessageText}
                               addNewMessage={props.addNewMessage}/>
        </div>

    )
}

export default Dialogs__Messages