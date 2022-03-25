import {useForm} from "react-hook-form";
import classes from "./Settings.module.css"
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useMemo, useState} from "react";
import Loading from "../../common/Loading/Loading";
import Photo from "./Photo";
import {getMyProfile, setMyInfo, setMyPhoto} from "../../redux/settings-reducer";


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
    const loading = useSelector(state => state.settings.isLoading)
    const profile = useSelector(state => state.settings.profile)
    const apiErrors = useSelector(state => state.settings.myErrors)


    const {img, contacts} = apiErrors

    const {fullName, lookingForAJob, lookingForAJobDescription, aboutMe} = profile

    const {github, vk, facebook, instagram, twitter, youtube} = profile.contacts

    const [radio, setRadio] = useState(lookingForAJob)
    const [imgLoading, setImgLoading] = useState(false)

    const submitErrors = {
        extendion : 'File should has .jpg, .jpeg or .png extendion',
        size: 'Image should be less then 10MB'
    }

    useEffect(() => dispatch(getMyProfile(id)),[])

    useEffect(() => {
        if (img === submitErrors.extendion || img === submitErrors.size) {
            setError("image", {
                type: "manual",
                message : img
            })
        }
    },[img])


    useMemo(() => {

        const error = 'Invalid url format'

        const facebookInvalid = `${error} (Contacts->Facebook)`
        const vkInvalid = `${error} (Contacts->Vk)`
        const twitterInvalid = `${error} (Contacts->Twitter)`
        const instagramInvalid = `${error} (Contacts->Instagram)`
        const youtubeInvalid = `${error} (Contacts->Youtube)`
        const githubInvalid = `${error} (Contacts->Github)`

        if (contacts !== null) {
            contacts.forEach(el => {
                if (el === githubInvalid) {
                    setError("github", {
                        type: "manual",
                        message: error
                    })
                } else if (el === vkInvalid) {
                    setError("vk", {
                        type: "manual",
                        message: error
                    })
                } else if (el === facebookInvalid) {
                    setError("facebook", {
                        type: "manual",
                        message: error
                    })
                } else if (el === instagramInvalid) {
                    setError("instagram", {
                        type: "manual",
                        message: error
                    })
                } else if (el === twitterInvalid) {
                    setError("twitter", {
                        type: "manual",
                        message: error
                    })
                    return el
                } else if (el === youtubeInvalid) {
                    setError("youtube", {
                        type: "manual",
                        message: error
                    })
                } else {
                    return el
                }
            })
        }
    },[contacts])


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

        dispatch(setMyInfo(obj, id))

        const resetObj = {}
        resetObj.fullName = fullName.length !== 0 ? fullName : profile.fullName
        resetObj.aboutMe = aboutMe.length !== 0 ? aboutMe : profile.aboutMe
        resetObj.lookingForAJobDescription = lookingForAJobDescription.length !== 0
            ? lookingForAJobDescription
            : profile.lookingForAJobDescription
        resetObj.github = github
        resetObj.vk = vk
        resetObj.facebook = facebook
        resetObj.instagram = instagram
        resetObj.twitter = twitter
        resetObj.youtube = youtube

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
        await dispatch(setMyPhoto(photo.image[0]))
        await setImgLoading(false)
    }

    if (loading) return <Loading/>

    return (
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
                            <input className={errors?.github ? `${classes.github} ${classes.errorBorder}` : classes.github}
                                   type="text"
                                   placeholder="&#xf09b;   Github"
                                   autoComplete={false}
                                   {...register("github", {value: github})}/>
                                   {errors?.github && <div className={classes.errorColor}>{errors.github.message}</div>}
                            <input className={errors?.vk ? `${classes.vk} ${classes.errorBorder}` : classes.vk}
                                   type="text" placeholder="&#xf189;   VK"
                                   autoComplete={false}
                                   {...register("vk", {value: vk})}/>
                                   {errors?.vk && <div className={classes.errorColor}>{errors.vk.message}</div>}
                            <input className={errors?.facebook ? `${classes.facebook} ${classes.errorBorder}` : classes.facebook}
                                   type="text"
                                   placeholder="&#xf09a;   Facebook"
                                   autoComplete={false}
                                   {...register("facebook", {value: facebook})}/>
                                   {errors?.facebook && <div className={classes.errorColor}>{errors.facebook.message}</div>}
                            <input className={
                                        errors?.instagram
                                        ? `${classes.instagram} ${classes.errorBorder}` : classes.instagram}
                                   type="text"
                                   placeholder="&#xf16d;   Instagram"
                                   autoComplete={false}
                                   {...register("instagram", {value: instagram})}/>
                                   {errors?.instagram && <div className={classes.errorColor}>{errors.instagram.message}</div>}
                            <input className={
                                        errors?.twitter
                                        ? `${classes.twitter} ${classes.errorBorder}` : classes.twitter}
                                   type="text" placeholder="&#xf099;   Twitter"
                                   autoComplete={false}
                                   {...register("twitter", {value: twitter})}/>
                                   {errors?.twitter && <div className={classes.errorColor}>{errors.twitter.message}</div>}
                            <input className={
                                        errors?.youtube
                                        ? `${classes.youtube} ${classes.errorBorder}` : classes.youtube}
                                   type="text" placeholder="&#xf167;   Youtube"
                                   autoComplete={false}
                                   {...register("youtube", {value: youtube})}/>
                                   {errors?.youtube && <div className={classes.errorColor}>{errors.youtube.message}</div>}
                        </label>
                    </div>
                    <input className={classes.button} value="Save" type="submit"/>
                </form>
            </div>
        </div>
    )
}

export default Settings