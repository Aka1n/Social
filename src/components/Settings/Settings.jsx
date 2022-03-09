import {useForm} from "react-hook-form";
import classes from "./Settings.module.css"
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useMemo, useState} from "react";
import {setInfo, setPhoto} from "../../redux/profile-reducer";
import Loading from "../../common/Loading/Loading";
import Photo from "./Photo";


const Settings = () => {

    const {
        formState: {
            errors,
        },
        register,
        setError,
        reset,
        handleSubmit
    } = useForm({
        mode: "onChange"
    })

    const dispatch = useDispatch()

    const id = useSelector(state => state.auth.user.id)
    const isLoading = useSelector(state => state.profilePage.isLoading)
    const profile = useSelector(state => state.profilePage.profile)
    const apiErrors = useSelector(state => state.profilePage.errors)

    const {img, contacts} = apiErrors

    const {fullName, lookingForAJob, lookingForAJobDescription, aboutMe, github,
        vk, facebook, instagram, twitter, youtube } = profile

    const [radio, setRadio] = useState(lookingForAJob)
    const [imgLoading, setImgLoading] = useState(false)

    const submitErrors = {
        extendion : 'File should has .jpg, .jpeg or .png extendion',
        size: 'Image should be less then 10MB'
    }

    useEffect(() => {
        if (img === submitErrors.extendion || img === submitErrors.size) {
            setError("image", {
                type: "manual",
                message : img
            })
        }
    },[img])


    const onSubmit = (data) => {
        delete data.image
        const userId = id

        const {lookingForAJob, lookingForAJobDescription, fullName, aboutMe,
            github, vk, facebook ,
            instagram, twitter, website,
            youtube, mainLink} = data

        const obj = {
            userId,
            lookingForAJob,
            lookingForAJobDescription,
            fullName,
            aboutMe,
            contacts: {
                github,
                vk,
                facebook,
                instagram,
                twitter,
                website,
                youtube,
                mainLink
            }
        }

        dispatch(setInfo(obj))

        const resetObj = {}
        resetObj.fullName = fullName.length !== 0 ? fullName : profile.fullName
        resetObj.aboutMe = aboutMe.length !== 0 ? aboutMe : profile.aboutMe
        resetObj.lookingForAJobDescription = lookingForAJobDescription.length !== 0
            ? lookingForAJobDescription
            : profile.lookingForAJobDescription

        reset(resetObj)
    }

    const onAvatar = async (photo) => {
        if (photo.image[0].type !== "image/jpeg" && photo.image[0].type !== "image/png") {
            return setError("image", {
                type: "manual",
                message: "File should has .jpg, .jpeg or .png extendion"
            })
        }
        await setImgLoading(true)
        await dispatch(setPhoto(photo.image[0]))
        await setImgLoading(false)
    }

    if (isLoading) return <Loading/>
    else return (
        <div className={classes.settings}>
            <h1 className={classes.title}>Settings</h1>
            <div className={classes.body}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={classes.avatar_name}>
                        <label className={classes.avatar}
                               onChange={handleSubmit(onAvatar)}
                               htmlFor="avatar">
                            Avatar
                            <div className={errors.image ? `${classes.p} ${classes.errorBorder}` : classes.p}>
                                <Photo errors={img} photo={profile.photos} loading={imgLoading}/>
                            </div>
                            {errors?.image && <div className={classes.photoError}>{errors.image.message}</div>}
                            <input id="avatar" className={classes.avatar_hidden} type="file"
                                   {...register("image")}/>
                        </label>
                        <div className={classes.name}>
                            <label>
                                Name
                                <input type="text" {...register("fullName", {value: fullName})}/>
                            </label>
                            <div>
                                Looking for a job
                                <div className={classes.label_job}>
                                    <input className={classes.job} type="radio"
                                           value={true}
                                           id="job-yes"
                                           checked={radio}
                                           onClick={() => setRadio(true)}
                                        {...register("lookingForAJob")}/>
                                    Yes
                                </div>
                                <div className={classes.label_job}>
                                    <input className={classes.job} type="radio"
                                           value={false}
                                           id="job-no"
                                           checked={!radio}
                                           onClick={() => setRadio(false)}
                                        {...register("lookingForAJob")}/>
                                    No
                                </div>
                            </div>
                            <label>
                                About Me
                                <input type="text" {...register("aboutMe", {value: aboutMe})}/>
                            </label>
                        </div>
                    </div>
                    <label>
                        Job description
                        <input name="job-description" type="text"
                            {...register("lookingForAJobDescription", {value: lookingForAJobDescription})}/>
                    </label>
                    <div className={classes.contacts}>
                        <label>
                            Contacts
                            <input className={classes.github}
                                   type="text"
                                   placeholder="&#xf09b;   Github"
                                   autoComplete={false}
                                   {...register("github", {value: github})}/>
                            <input className={classes.vk}
                                   type="text" placeholder="&#xf189;   VK"
                                   autoComplete={false}
                                   {...register("vk", {value: vk})}/>
                            <input className={classes.facebook}
                                   type="text"
                                   placeholder="&#xf09a;   Facebook"
                                   autoComplete={false}
                                   {...register("facebook", {value: facebook})}/>
                            <input className={classes.instagram}
                                   type="text"
                                   placeholder="&#xf16d;   Instagram"
                                   autoComplete={false}
                                   {...register("instagram", {value: instagram})}/>
                            <input className={classes.twitter}
                                   type="text" placeholder="&#xf099;   Twitter"
                                   autoComplete={false}
                                   {...register("twitter", {value: twitter})}/>
                            <input className={classes.youtube}
                                   type="text" placeholder="&#xf167;   Youtube"
                                   autoComplete={false}
                                   {...register("youtube", {value: youtube})}/>
                        </label>
                    </div>
                    <input className={classes.button} value="Save" type="submit"/>
                </form>
            </div>
        </div>
    )
}

export default Settings