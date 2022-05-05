import classes from './DialogsTextArea.module.css'
import {FC} from "react";

type Props = {
    newMessageText: string
    addNewMessageText: (text: string) => void
    userId: number | string
    addNewMessage: (userId: number, message: string) => void
    common: boolean
    ws: WebSocket | null
    wsStatus: boolean
}


const DialogsTextArea: FC<Props> = ({newMessageText, addNewMessageText, userId,
                                        addNewMessage, common, ws, wsStatus}) => {

    const addMessageText = (e: any) => {
        addNewMessageText(e.target.value)
    }

    return (
        <div className={classes.textarea}>
            <textarea onChange={addMessageText}
                      value={newMessageText}/>
            <button className={classes.button}
                    disabled={!wsStatus}
                    onClick={!common ? () => {addNewMessage(+userId, newMessageText)}
                        : () => ws?.send(newMessageText)}>Send</button>
        </div>
    )
}

export default DialogsTextArea