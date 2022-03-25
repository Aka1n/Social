import classes from './DialogsTextArea.module.css'

function DialogsTextArea(props) {

    let addMessageText = (element) => {
        let text = element.target.value
        props.addNewMessageText(text)
    }

    return (
        <div className={classes.textarea}>
            <textarea onChange={addMessageText}
                      value={props.newMessageText}></textarea>
            <button className={classes.button}
                    onClick={() => props.addNewMessage(props.userId, props.newMessageText)}>Send</button>
        </div>
    )
}

export default DialogsTextArea