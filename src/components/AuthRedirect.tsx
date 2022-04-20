import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import Loading from "../common/Loading/Loading";
import {RootState} from "../redux/redux-store";

const AuthRedirect = ({children}: {children: JSX.Element}) => {

    const isAuth = useSelector((state: RootState) => state.auth.isAuth)
    const isLoading = useSelector((state: RootState) => state.auth.isLoading)

    if (isLoading) return <Loading/>
    if (!isAuth) return <Navigate to="/login"/>

    return children

}

export default AuthRedirect