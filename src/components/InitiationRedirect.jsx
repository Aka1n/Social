import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import Loading from "../common/Loading/Loading";

const InitiationRedirect = () => {

    const isAuth = useSelector(state => state.auth.isAuth)
    const isLoading = useSelector(state => state.auth.isLoading)

    if (isLoading) return <Loading/>
    if (!isAuth) return <Navigate to="/login"/>
    else return <Navigate to="/profile"/>



}

export default InitiationRedirect