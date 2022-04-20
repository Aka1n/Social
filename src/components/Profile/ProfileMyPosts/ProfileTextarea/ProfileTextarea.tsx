import classes from "./ProfileTextarea.module.css";
import {ChangeEvent, FC} from "react";
import {Action} from "redux";

type Props = {
    addNewPostText: (text: string) => Action
    addPostActionCreator: () => Action
    newPostChange: string
}

const ProfileTextarea: FC<Props> = ({addNewPostText, addPostActionCreator, newPostChange}) => {

    const addPostText = (element: ChangeEvent<HTMLTextAreaElement>) => {
        const text = element.target.value;
        addNewPostText(text);
    };

    return (
        <div className={classes.textarea}>
      <textarea
          onChange={addPostText}
          value={newPostChange}
      />
            <div className={classes.button}>
                <button onClick={() => addPostActionCreator()}>Send</button>
            </div>
        </div>
    );
}

export default ProfileTextarea;
