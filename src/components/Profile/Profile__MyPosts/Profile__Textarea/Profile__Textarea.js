import classes from "./Profile__Textarea.module.css";

function Profile__Textarea(props) {

    let addPostText = (element) => {
        let text = element.target.value
        props.addNewPostText(text)
    }
    let addPost = () => {
        props.addPostActionCreator()}

    return (
        <div className={classes.textarea}>
            <textarea onChange={addPostText} value={props.profilePage.newPostChange} ></textarea>
            <div className={classes.button}>
                <button onClick={addPost}>Send</button>
            </div>
        </div>
    )
}

export default Profile__Textarea