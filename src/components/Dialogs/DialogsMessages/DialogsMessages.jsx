import classes from './DialogsMessages.module.css'
import DialogsTextArea from "./DialogsTextArea/DialogsTextArea";
import {useMemo} from "react";


function DialogsMessages(props) {

    let Messages = ({messages}) => useMemo(() => messages.map(el => <div className={classes.item}>
            <div className={classes.message} dangerouslySetInnerHTML={{__html: el.body}}></div>
        </div>)
    ,[])


    return (
        <div className={classes.messages}>
            <div className={classes.body}>
                <Messages messages={props.dialogsPage.messages}/>
            </div>
            <DialogsTextArea newMessageText={props.dialogsPage.newMessageText}
                             addNewMessageText={props.addNewMessageText}
                             userId={props.userId}
                             addNewMessage={props.addNewMessage}/>
        </div>

    )
}

export default DialogsMessages