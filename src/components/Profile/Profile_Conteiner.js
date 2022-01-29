import {connect} from "react-redux";
import {
    addLike,
    addNewPostText,
    addPostActionCreator,
    myProfile,
    removeLike, setStatus,
    setUserProfile
} from "../../redux/profile-reducer";
import Profile from "./Profile";
import * as React from "react";
import {Navigate, useMatch} from 'react-router-dom'
import {withRedirect} from "../../hoc/withRedirect";
import { compose } from 'redux';

class Profile_Api_Container extends React.Component {

    componentDidMount() {
        this.props.myProfile(this.props.match)
    }

    render() {
        //if (!this.props.isAuth) return <Navigate to='/login'/>
        return <Profile {...this.props}/>
    }
}
let mapStateToProps = (state) => {
    return {
        id : state.auth.id,
        profilePage: state.profilePage,
        newPostChange : state.profilePage.newPostChange,
        profile : state.profilePage.profile,
        isLoading : state.profilePage.isLoading,
        status : state.profilePage.status
    }
}

let ProfileMatch = (props) => {
    const match = useMatch('profile/:userId/')
    return <Profile_Api_Container {...props} match={match}/>
}

const Profile_Container = compose(
    withRedirect,
    connect(mapStateToProps, {
        addPostActionCreator,
        addNewPostText,
        addLike,
        removeLike,
        setUserProfile,
        myProfile,
        setStatus
    })
)(ProfileMatch)


export default Profile_Container
