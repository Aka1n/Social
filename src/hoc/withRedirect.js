import * as React from "react";
import {connect} from "react-redux";
import {Navigate} from 'react-router-dom'


let mapStateToProps = (state) => ({isAuth : state.auth.isAuth})

export const withRedirect = (Component) => {
    class Redirect_Component extends React.Component {
        render() {
            if (!this.props.isAuth) return <Navigate to='/login'/>
            return <Component {...this.props}/>
        }
    }
    return connect(mapStateToProps)(Redirect_Component)
}




