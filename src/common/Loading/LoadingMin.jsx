import classes from "../../common/Loading/LoadingMin.module.css";
import loading from "../../img/Rolling-1s-200px.svg";

function LoadingMin() {
    return (
        <div className={classes.body}>
            <img className={classes.loading} src={loading} alt=""/>
        </div>
    )
}

export default LoadingMin