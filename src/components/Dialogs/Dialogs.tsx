import classes from './Dialogs.module.css'
import DialogsNames from "./DialogsNames/DialogsNames";
import DialogsMessages from "./DialogsMessages/DialogsMessages";
import {useDispatch, useSelector} from "react-redux";
import {addNewMessageText, getMessages, setMessage, setUserId} from "../../redux/dialogs-reducer";
import {useMatch} from "react-router-dom";
import {AppDispatch, RootState} from '../../redux/redux-store'
import {getDialogs} from "../../redux/dialogs-reducer";
import {FC} from "react";

const Dialogs: FC = () =>  {

    const match = useMatch("/dialogs/:userId")
    const dialogsPage = useSelector((state: RootState) => state.dialogsPage)
    const {dialogs, userId, isLoading, messages, newMessageText} = dialogsPage
    const id = useSelector((state: RootState) => state.auth.user.id)
    const dispatch: AppDispatch = useDispatch()

    return (
        <div className={classes.dialogs}>
            <div className={classes.title}></div>
            <div className={classes.body}>
                <DialogsNames names={dialogs}
                              getMessages={(userId: number) => dispatch(getMessages(userId))}
                              setUserId={(userId: number) => dispatch(setUserId(userId))}
                              getDialogs={() => dispatch(getDialogs())}
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
                />
            </div>
        </div>
    )
}

export default Dialogs