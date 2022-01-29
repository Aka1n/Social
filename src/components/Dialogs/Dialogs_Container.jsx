import {connect} from "react-redux";
import Dialogs from "./Dialogs";
import {addNewMessage, addNewMessageText} from "../../redux/dialogs-reducer";
import * as React from "react";
import {compose} from "redux";


class Dialogs_Api_Container extends React.Component {
    render() {
        return (<Dialogs {...this.props}/>)
    }
}

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
    }
}

export default compose(
    connect(mapStateToProps, {
        addNewMessageText,
        addNewMessage
    })
)(Dialogs_Api_Container)