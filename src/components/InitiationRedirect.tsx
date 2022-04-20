import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import Loading from "../common/Loading/Loading";
import {RootState} from "../redux/redux-store";

const InitiationRedirect = () => {

    const isAuth = useSelector((state: RootState) => state.auth.isAuth)
    const isLoading = useSelector((state: RootState) => state.auth.isLoading)

    if (isLoading) return <Loading/>
    if (!isAuth) return <Navigate to="/login"/>
    else return <Navigate to="/profile"/>

}

export default InitiationRedirect