import classes from './DialogsMessages.module.css'
import DialogsTextArea from "./DialogsTextArea/DialogsTextArea";

let messages = (messages) => {
    return messages.map(el => <div className={classes.item}>
        <div className={classes.message}>{el.message}</div>
    </div>)
}

function DialogsMessages(props) {
    return (
        <div className={classes.messages}>
            <div className={classes.body}>
                {messages(props.dialogsPage.messages)}
            </div>
            <DialogsTextArea newMessageText={props.dialogsPage.newMessageText}
                             addNewMessageText={props.addNewMessageText}
                             addNewMessage={props.addNewMessage}/>
        </div>

    )
}

export default DialogsMessages