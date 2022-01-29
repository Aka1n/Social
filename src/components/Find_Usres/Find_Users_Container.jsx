import {connect} from "react-redux";
import {
    setTotalPages,
    toggleUserFollowLoading,
    getFollowThunk,
    getUnFollowThunk,
    setPage, getUsers
} from "../../redux/findUsers-reducer";
import * as React from "react";
import Find_User__User from "./Find_Users__User/Find_Users_User";
import classes from "./Find_Users.module.css";
import Find_Users from "./Find_Users";
import {compose} from "redux";

class Find_Users_Api_Container extends React.Component {

    componentDidMount() {
        this.props.getUsers(this.props.findUsersPage.users.length, this.props.findUsersPage.pageNumber)

    }
    getFollow = (userId) => this.props.getFollowThunk(userId)
    getUnFollow = (userId) => this.props.getUnFollowThunk(userId)

    AddUsers = (users) => users.map((user) => <Find_User__User id={user.id}
                                                               followed={user.followed}
                                                               name={user.name}
                                                               status={user.status}
                                                               photos={user.photos}
                                                               follow={this.getFollow}
                                                               unFollow={this.getUnFollow}
                                                               userFollowLoading={this.props.userFollowLoading}/>)
    addPages = (pages) => {
        let mass = []
        for (let i =
            (this.props.findUsersPage.pageNumber === this.props.findUsersPage.totalPages - 2) ? this.props.findUsersPage.pageNumber - 2 :
                (this.props.findUsersPage.pageNumber === this.props.findUsersPage.totalPages - 1) ? this.props.findUsersPage.pageNumber - 3 :
                    (this.props.findUsersPage.pageNumber === this.props.findUsersPage.totalPages) ? this.props.findUsersPage.pageNumber - 4 :
                        (this.props.findUsersPage.pageNumber >= 3) ? this.props.findUsersPage.pageNumber - 2 :
                            (this.props.findUsersPage.pageNumber === 2) ? this.props.findUsersPage.pageNumber - 1 :
                                (this.props.findUsersPage.pageNumber === 1) ? this.props.findUsersPage.pageNumber : null; pages >= i; i++) {
            mass.push(<div onClick={() => this.page(i)}
                           className={(this.props.findUsersPage.pageNumber === i) ? `${classes.page} ${classes.active}` : classes.page}>{i}</div>)
            if (mass.length >= 5) {
                return mass
            }
        }
    }
    page = (page) => this.props.setPage(page)

    render() {
        return <Find_Users AddUsers={this.AddUsers}
                           users={this.props.findUsersPage.users}
                           pageNumber={this.props.findUsersPage.pageNumber}
                           totalPages={this.props.findUsersPage.totalPages}
                           addPages={this.addPages}
                           page={this.page}
                           loading={this.props.findUsersPage.isLoading}

        />
    }
}

let mapStateToProps = (state) => {
    return {
        findUsersPage: state.findUsersPage,
        totalPages: state.findUsersPage.totalPages,
        pageNumber: state.findUsersPage.pageNumber,
        isLoading: state.findUsersPage.isLoading,
        userFollowLoading : state.findUsersPage.userFollowLoading
    }
}

export default compose(
    connect(mapStateToProps, {
        toggleUserFollowLoading,
        setTotalPages,
        getUsers,
        getFollowThunk,
        getUnFollowThunk,
        setPage
    })
)(Find_Users_Api_Container)