import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faGithubSquare,
  faInstagramSquare,
  faTwitterSquare,
  faVk,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import classes from "./ProfileData.module.css";
import Loading from "../../../common/Loading/Loading";
import defaultAvatar from "../../../img/default-user.png";
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import * as React from "react";
import {ProfileType} from "../../../types/types";
import {FC} from "react";

type Props = {
  profile: ProfileType
  isLoading: boolean
  status: string
  setStatus: (status: any) => Promise<void>
  id: string | null | undefined
  me: number | null
}

const ProfileData: FC<Props> = ({profile, isLoading, status, setStatus, id, me}) => {
  
  if (isLoading) return <Loading />;
  
  return (
    <div className={classes.profile}>
      <div className={classes.body}>
        <img
          className={classes.avatar}
          src={
            !profile.photos.large
              ? defaultAvatar
              : profile.photos.large
          }
          alt=""
        />
        <div className={classes.data}>
          <div className={classes.item}>{profile.fullName}</div>
          <ProfileStatus
            me={me}
            id={id}
            status={status}
            setStatus={setStatus}
            isLoading={isLoading}
          />
          <div className={classes.item}>Date of Birth : 2 january</div>
          <div className={classes.item}>City : Minsk</div>
          <div className={classes.item}>Education : BSU 11</div>
          <div className={classes.item}>{profile.aboutMe}</div>
          <div className={classes.contacts}>
            {[
              profile.contacts.facebook ? (
                <a href={`https://${profile.contacts.facebook}`}>
                  <FontAwesomeIcon
                    className={classes.social}
                    icon={faFacebookSquare}
                  />
                </a>
              ) : null,
              profile.contacts.github ? (
                <a href={`https://${profile.contacts.github}`}>
                  <FontAwesomeIcon
                    className={classes.social}
                    icon={faGithubSquare}
                  />
                </a>
              ) : null,
              profile.contacts.instagram ? (
                <a href={`https://${profile.contacts.instagram}`}>
                  <FontAwesomeIcon
                    className={classes.social}
                    icon={faInstagramSquare}
                  />
                </a>
              ) : null,
              profile.contacts.twitter ? (
                <a href={`https://${profile.contacts.twitter}`}>
                  <FontAwesomeIcon
                    className={classes.social}
                    icon={faTwitterSquare}
                  />
                </a>
              ) : null,
              profile.contacts.vk ? (
                <a href={`https://${profile.contacts.vk}`}>
                  <FontAwesomeIcon className={classes.social} icon={faVk} />
                </a>
              ) : null,
              profile.contacts.youtube ? (
                <a href={`https://${profile.contacts.youtube}`}>
                  <FontAwesomeIcon
                    className={classes.social}
                    icon={faYoutube}
                  />
                </a>
              ) : null,
            ]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileData;
