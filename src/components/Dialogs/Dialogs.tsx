import classes from './Dialogs.module.css'
import DialogsNames from "./DialogsNames/DialogsNames";
import DialogsMessages from "./DialogsMessages/DialogsMessages";
import {useDispatch, useSelector} from "react-redux";
import {addNewMessageText, getMessages, setMessage, setUserId, setCommonDialog} from "../../redux/dialogs-reducer";
import {useMatch} from "react-router-dom";
import {AppDispatch, RootState} from '../../redux/redux-store'
import {getDialogs} from "../../redux/dialogs-reducer";
import {FC, useEffect, useState} from "react";

const Dialogs: FC = () =>  {

    const match = useMatch("/dialogs/:userId")
    const dialogsPage = useSelector((state: RootState) => state.dialogsPage)
    const {dialogs, userId, isLoading, messages, newMessageText, commonDialog} = dialogsPage
    const id = useSelector((state: RootState) => state.auth.user.id)
    const dispatch: AppDispatch = useDispatch()

    const [device, setDevice] = useState<string>('PC')

    useEffect(() => {
        if (window.innerWidth <= 726) {
            setDevice('Mobile')
        }
    },[])

    return (
        <div className={classes.dialogs}>
            <div className={classes.title}/>
            <div className={classes.body}>
                <DialogsNames names={dialogs}
                              getMessages={(userId: number) => dispatch(getMessages(userId))}
                              setUserId={(userId: number) => dispatch(setUserId(userId))}
                              getDialogs={() => dispatch(getDialogs())}
                              match={match}
                              device={device}


                />
                <DialogsMessages messages={messages}
                                 newMessageText={newMessageText}
                                 userId={userId}
                                 addNewMessageText={(text: string) => dispatch(addNewMessageText(text))}
                                 addNewMessage={(userId: number, message: string) => dispatch(setMessage(userId, message))}
                                 id={id}
                                 loading={isLoading}
                                 getMessages={(userId: number) => dispatch(getMessages(userId))}
                                 match={match ? match.params.userId : null}
                                 setCommonDialog={(dialogs: any) => dispatch(setCommonDialog(dialogs))}
                                 commonDialog={commonDialog}
                                 device={device}
                                 names={dialogs}
                />
            </div>
        </div>
    )
}

export default Dialogs