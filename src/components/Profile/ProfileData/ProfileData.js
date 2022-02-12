import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookSquare,
  faGithubSquare,
  faInstagramSquare,
  faTwitterSquare,
  faVk,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import classes from './ProfileData.module.css';
import Loading from '../../../common/Loading/Loading';
import defaultAvatar from '../../../img/default-user.png';
import ProfileStatus from './ProfileStatus/ProfileStatus';

function ProfileData(props) {
  if (!props.profile || props.isLoading) return <Loading />;
  return (
    <div className={classes.profile}>
      <div className={classes.body}>
        <img
          className={classes.avatar}
          src={
            !props.profile.photos.large
              ? defaultAvatar
              : props.profile.photos.large
          }
          alt=""
        />
        <div className={classes.data}>
          <div className={classes.item}>{props.profile.fullName}</div>
          <ProfileStatus
            me={props.me}
            id={props.id}
            status={props.status}
            setStatus={props.setStatus}
            isLoading={props.isLoading}
          />
          <div className={classes.item}>Date of Birth : 2 january</div>
          <div className={classes.item}>City : Minsk</div>
          <div className={classes.item}>Education : BSU 11</div>
          <div className={classes.item}>{props.profile.aboutMe}</div>
          <div className={classes.contacts}>
            {[
              props.profile.contacts.facebook ? (
                <a href={`https://${props.profile.contacts.facebook}`}>
                  <FontAwesomeIcon
                    className={classes.social}
                    icon={faFacebookSquare}
                  />
                </a>
              ) : null,
              props.profile.contacts.github ? (
                <a href={`https://${props.profile.contacts.github}`}>
                  <FontAwesomeIcon
                    className={classes.social}
                    icon={faGithubSquare}
                  />
                </a>
              ) : null,
              props.profile.contacts.instagram ? (
                <a href={`https://${props.profile.contacts.instagram}`}>
                  <FontAwesomeIcon
                    className={classes.social}
                    icon={faInstagramSquare}
                  />
                </a>
              ) : null,
              props.profile.contacts.twitter ? (
                <a href={`https://${props.profile.contacts.twitter}`}>
                  <FontAwesomeIcon
                    className={classes.social}
                    icon={faTwitterSquare}
                  />
                </a>
              ) : null,
              props.profile.contacts.vk ? (
                <a href={`https://${props.profile.contacts.vk}`}>
                  <FontAwesomeIcon className={classes.social} icon={faVk} />
                </a>
              ) : null,
              props.profile.contacts.youtube ? (
                <a href={`https://${props.profile.contacts.youtube}`}>
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
}

export default ProfileData;
