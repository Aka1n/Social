import classes from './DialogsTextArea.module.css'

function DialogsTextArea(props) {

    let addMessageText = (element) => {
        let text = element.target.value
        props.addNewMessageText(text)
    }
    let addMessage = () => props.addNewMessage()

    return (
        <div className={classes.textarea}>
            <textarea onChange={addMessageText}
                      value={props.newMessageText}></textarea>
            <button className={classes.button} onClick={addMessage}>Send</button>
        </div>
    )
}

export default DialogsTextArea