import classes from './ProfileStatus.module.css'
import * as React from "react";
import Loading from "../../../../common/Loading/Loading";

class ProfileStatus extends React.Component{

    state = {
        editMode : false,
        status : this.props.status,
        isLoading : false
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status : this.props.status
            })
        }
    }

    disabledStatus = () => {
        this.setState({
            editMode : false,
            isLoading : true
        })
        this.props.setStatus(this.state.status).finally(() => {
            this.setState({
                isLoading : false
            })
        })
    }
    includedStatus = () => {
        this.setState({
            editMode : true
        })
    }
    onChangeStatus = (e) => {
        this.setState({
            status : e.currentTarget.value
        })
    }

    render() {
        console.log('render')
        if (this.state.isLoading) return <Loading/>
        else return (
            <div className={classes.status}>
                {!this.state.editMode ? <div className={classes.text} onDoubleClick={this.includedStatus}>
                        {(!this.props.status ? 'write your status...' : this.props.status)}</div> :
                    <input value={!this.state.status ? '' : this.state.status}
                           onChange={this.onChangeStatus}
                           className={classes.input}
                           onBlur={this.disabledStatus} autoFocus/>}
            </div>
        )

    }
}

export default ProfileStatus