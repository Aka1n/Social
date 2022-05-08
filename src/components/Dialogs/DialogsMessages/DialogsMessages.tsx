import classes from './DialogsMessages.module.css'
import DialogsTextArea from "./DialogsTextArea/DialogsTextArea";
import {FC, useEffect, useState} from "react";
import Loading from "../../../common/Loading/Loading";
import {commonDialog, DialogType, MessageType} from "../../../types/types";
import {bodyRef} from "../../../App";
import {NavLink} from "react-router-dom";
import defaultImg from "../../../img/default-user.png"


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
    setCommonDialog: (dialogs: any) => void
    commonDialog: commonDialog[]
    device: string
    names: Array<DialogType>

}

type MessagesType = {
    messages: Array<MessageType> | [],
}


const DialogsMessages: FC<Props> = ({userId, addNewMessageText, addNewMessage,
                             id, loading, getMessages,
                             match, messages, newMessageText,
                                        setCommonDialog, commonDialog, device, names}) => {

    const [common, setCommon] = useState<boolean>(false)
    const [webSocket, setWebSocket] = useState<WebSocket | null>(null)
    const [wsStatus, setWsStatus] = useState<boolean>(false)

    useEffect(() => {

        let ws: WebSocket

        const closeWs = () => setTimeout(createWebSocket, 3000)

        function createWebSocket() {
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            ws.addEventListener('close', closeWs)
            setWebSocket(ws)
        }
        createWebSocket()

        return () => {
            ws.removeEventListener('close', closeWs)
            ws.close()
        }

    },[])


    useEffect(() => {

        const addMessage = (e: MessageEvent<any>) => {
            let message = JSON.parse(e.data)
            setCommonDialog(message)
        }

        webSocket?.addEventListener('message', addMessage)

        return () => {
            webSocket?.removeEventListener('message', addMessage)
        }

    },[webSocket])

    useEffect(() => {

        const wsOpen = () => {
            setWsStatus(true)
        }

        const wsClose = () => setWsStatus(false)

        webSocket?.addEventListener('open', wsOpen)
        webSocket?.addEventListener('close', wsClose)

        return () => {
            webSocket?.removeEventListener('open', wsOpen)
            webSocket?.removeEventListener('close', wsClose)
        }

    },[webSocket])

    useEffect(() => {
        if (match === "common") {
            bodyRef.current.scrollTo(0, 5000)
        }
    },[common, commonDialog,loading])


    useEffect(() => {

        if (match === "common") {
            setCommon(true)
        } else if (match) {
            setCommon(false)
            getMessages(+match)
        }
    },[match])


    const Messages: FC<MessagesType> = ({messages}) => {

        return (
            <>
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
        )
    }


    const CommonMessages: FC<{
        messages: commonDialog[]}> = ({messages}) => {

        return (
            <>
                {
                    messages.map((el, index) => <div className={
                        el.userId === id
                        ? classes.item
                        : `${classes.item} ${classes.second_item}`} key={index}>
                        <div className={el.userId === id ?
                            classes.message : classes.second_message}
                             dangerouslySetInnerHTML={{__html: el.message}}/>
                    </div>)
                }
            </>
        )
    }

    const Name: FC<{match: string | number, names: Array<DialogType>}>
        = ({match, names}) => {

            let user: DialogType[] | [] = names

            user = user.filter(el => el.id === +match)

            return (
                <div className={classes.dialogInfo}>
                    <NavLink className={classes.back} to={'/dialogs'}>Back</NavLink>
                    <div className={classes.name}>
                        <img className={classes.avatar}
                             src={user[0]?.photos.small ? user[0].photos.small : defaultImg} alt=""/>
                        <div>{user[0]?.userName}</div>
                    </div>
                </div>
                )
        }

    if (!match && device === 'Mobile') {
        return (<></>)
    }

    if (!match && device === 'PC') {
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
                {match && device === 'Mobile' ? <Name match={match} names={names}/> : null}
                {loading ? <Loading/> : common ? <div className={match && device === 'Mobile' ? classes.pad : ''}>
                        <CommonMessages messages={commonDialog}/></div>
                : <div className={match && device === 'Mobile' ? classes.pad : ''}>
                        <Messages messages={messages}/>
                </div>}
            </div>
            <DialogsTextArea newMessageText={newMessageText}
                             addNewMessageText={addNewMessageText}
                             userId={userId}
                             addNewMessage={addNewMessage}
                             common={common}
                             ws={webSocket}
                             wsStatus={wsStatus}
            />
        </div>

    )
}

export default DialogsMessages