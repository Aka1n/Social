import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import classes from "./NotFound.module.css";
import * as React from "react";

const NotFound = ({text}) => {
    return <div className={classes.notfound}>
        <FontAwesomeIcon className={classes.icon} icon={faSearch} />
        <h2 className={classes.text}>{text}</h2>
    </div>
}

export default NotFound