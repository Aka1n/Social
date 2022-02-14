import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import Loading from "../common/Loading/Loading";

const AuthRedirect = ({children}) => {

    const isAuth = useSelector(state => state.auth.isAuth)
    const isLoading = useSelector(state => state.auth.isLoading)

    if (isLoading) return <Loading/>
    if (!isAuth) return <Navigate to="/login"/>

    return children

}

export default AuthRedirect