import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import classes from "./ProfilePost.module.css";
import avatar from "../../../../img/IMG_7839.jpg";
import * as React from "react";
import {Action} from "redux";
import {FC} from "react";

type Props = {
  likes: number
  message: string
  liked: boolean
  id: number
  addLike: (id: number) => Action
  removeLike: (id: number) => Action
}

const ProfilePost: FC<Props> = ({likes, message, liked ,id, addLike, removeLike}) => {

  return (
    <div className={classes.post}>
      <div className={classes.body}>
        <div className={classes.avatar}>
          <img src={avatar} alt="" />
        </div>
        <div className={classes.item}>
          <div className={classes.text}>{message}</div>
          <div className={classes.like}>
            {liked ? (
              <FontAwesomeIcon
                onClick={() => removeLike(id)}
                className={`${classes.icon} ${classes.active}`}
                icon={faHeart}
              />
            ) : (
              <FontAwesomeIcon
                onClick={() => addLike(id)}
                className={classes.icon}
                icon={faHeart}
              />
            )}
            <div className={classes.likes}>{likes}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePost;
