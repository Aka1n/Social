import {connect} from "react-redux";
import Navigation from "./Navigation";
import React from "react";
import {myProfile} from "../../redux/navigation-reducer";
import {compose} from "redux";


class Navigation_Api_Conteiner extends React.Component {

    render() {
        return (
            <Navigation {...this.props}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        navigation : state.navigation,
        id : state.auth.id,
        profileId : state.profilePage.profile
    }
}

export default compose(
    connect(mapStateToProps, {
        myProfile,
    })
)(Navigation_Api_Conteiner)