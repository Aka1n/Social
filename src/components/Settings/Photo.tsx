import React, {FC, useMemo} from "react";
import svg from "../../img/Rolling-1s-200px.svg"
import classes from "./Photo.module.css"
import {PhotosType} from "../../types/types";

type Props = {
    errors: string | null
    loading: boolean
    photo: PhotosType
}

const Photo: FC<Props> = ({photo, loading, errors}) => useMemo(() => {

    if (loading) return (
        <div className={classes.imgBody}>
            <img className={classes.imgLoading} src={svg} alt=""/>
        </div>
    )

    return <img className={classes.img} src={photo.large} alt=""/>

},[photo,loading,errors])

export default Photo