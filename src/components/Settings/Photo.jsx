import React, {useMemo} from "react";
import svg from "../../img/Rolling-1s-200px.svg"
import classes from "./Photo.module.css"

const Photo = ({photo, loading, apiImgErrors}) => useMemo(() => {

    if (loading) return (
        <div className={classes.imgBody}>
            <img className={classes.imgLoading} src={svg} alt=""/>
        </div>
    )

    return <img className={classes.img} src={photo.large} alt=""/>

},[photo,loading,apiImgErrors])

export default Photo