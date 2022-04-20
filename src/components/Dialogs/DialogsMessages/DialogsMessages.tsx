import classes from './DialogsMessages.module.css'
import DialogsTextArea from "./DialogsTextArea/DialogsTextArea";
import {FC, useEffect, useMemo} from "react";
import Loading from "../../../common/Loading/Loading";
import {dialogApi} from "../../../api/api";
import {MessageType} from "../../../types/types";


type Props = {
    userId: number |  ''
    addNewMessageText: (text: string) => void
    addNewMessage: (userId: number, message: string) => void
    id: number | null
    loading: boolean
    getMessages: (userId: number) => void
    match: string | number | null | undefined
    messages: Array<MessageType> | [],
    newMessageText: string

}

type MessagesType = {
    messages: Array<MessageType> | [],
}

const DialogsMessages: FC<Props> = ({userId, addNewMessageText, addNewMessage,
                             id, loading, getMessages,
                             match, messages, newMessageText}) => {

    useEffect(() => {
        if (match) {
            getMessages(+match)
        }
    },[match])

    let Messages: FC<MessagesType> = ({messages}): JSX.Element => useMemo(
        () => <>
            {
            messages.map(el => <div key={el.id}
                                    className={el.senderId === id
                                        ? classes.item
                                        : `${classes.item} ${classes.second_item}`}>
                    <div className={el.senderId === id ?
                        classes.message : classes.second_message}
                         dangerouslySetInnerHTML={{__html: el.body}}/>
                </div>
            )
        }
        </>
    ,[messages])

    if (!match) {
        return (
            <div className={classes.select_dialog}>
                <div>
                    Select a user to send a message
                </div>
            </div>
        )
    }

    return (
        <div className={classes.messages}>
            <div className={classes.body}>
                {loading ? <Loading/> : <Messages messages={messages}/>}
            </div>
            <DialogsTextArea newMessageText={newMessageText}
                             addNewMessageText={addNewMessageText}
                             userId={userId}
                             addNewMessage={addNewMessage}/>
        </div>

    )
}

export default DialogsMessages