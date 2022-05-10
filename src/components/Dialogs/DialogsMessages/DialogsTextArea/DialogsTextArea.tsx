import classes from './DialogsTextArea.module.css'
import {FC} from "react";
import {SendMessage} from "react-use-websocket/src/lib/types"
import {ReadyState} from "react-use-websocket/dist/lib/constants.d"

type Props = {
    newMessageText: string
    addNewMessageText: (text: string) => void
    userId: number | string
    addNewMessage: (userId: number, message: string) => void
    common: boolean
    sendMessage: SendMessage
    readyState: ReadyState
}


const DialogsTextArea: FC<Props> = ({newMessageText, addNewMessageText, userId,
                                        addNewMessage, common, sendMessage, readyState }) => {

    const addMessageText = (e: any) => {
        addNewMessageText(e.target.value)
    }

    return (
        <div className={classes.textarea}>
            <textarea onChange={addMessageText}
                      value={newMessageText}/>
            <button className={classes.button}
                    disabled={readyState === 3 || readyState === 0}
                    onClick={!common ? () => {addNewMessage(+userId, newMessageText)}
                        : () => sendMessage(newMessageText)}>Send</button>
        </div>
    )
}

export default DialogsTextArea