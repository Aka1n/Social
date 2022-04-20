import classes from './DialogsTextArea.module.css'
import {FC} from "react";

type Props = {
    newMessageText: string
    addNewMessageText: (text: string) => void
    userId: number | ""
    addNewMessage: (userId: number, message: string) => void
}


const DialogsTextArea: FC<Props> = ({newMessageText, addNewMessageText, userId, addNewMessage}) => {

    const addMessageText = (e: any) => {
        addNewMessageText(e.target.value)
    }

    return (
        <div className={classes.textarea}>
            <textarea onChange={addMessageText}
                      value={newMessageText}></textarea>
            <button className={classes.button}
                    onClick={() => addNewMessage(+userId, newMessageText)}>Send</button>
        </div>
    )
}

export default DialogsTextArea