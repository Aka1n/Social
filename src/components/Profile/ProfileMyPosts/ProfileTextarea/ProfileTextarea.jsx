import classes from "./ProfileTextarea.module.css";

function ProfileTextarea(props) {
  const addPostText = (element) => {
    const text = element.target.value;
    props.addNewPostText(text);
  };
  const addPost = () => props.addPostActionCreator();

  return (
    <div className={classes.textarea}>
      <textarea
        onChange={addPostText}
        value={props.profilePage.newPostChange}
      />
      <div className={classes.button}>
        <button onClick={addPost}>Send</button>
      </div>
    </div>
  );
}

export default ProfileTextarea;
