import classes from "../../common/Loading/Loading.module.css";
import loading from "../../img/Rolling-1s-200px.svg";

function Loading() {
    return (
        <div className={classes.body_loading}>
            <img className={classes.loading} src={loading} alt=""/>
        </div>
    )
}

export default Loading