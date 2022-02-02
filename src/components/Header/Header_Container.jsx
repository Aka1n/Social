import {connect} from "react-redux";
import React from "react";
import Header from "./Header";
import {getLogin, setLogOut} from "../../redux/auth-reducer";
import {compose} from "redux";

class Header_Api_Container extends React.Component {
    componentDidMount() {
        this.props.getLogin(this.props.id)
    }
    render() {
        return (
            <Header {...this.props}/>
        )
    }
}

let mapStateToProps = (state) => ({
    id : state.auth.id,
    login : state.auth.login,
    email : state.auth.email,
    isAuth : state.auth.isAuth,
})
export default compose(
    connect(mapStateToProps, {
        getLogin,
        setLogOut
    })
)(Header_Api_Container)
