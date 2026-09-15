import {Navigate, Outlet, useLocation} from "react-router";
import {useAppSelector} from "../../app/hooks.ts";
import {isUserAuthenticated} from "../../app/slices/userSlice.ts";
import {useGetMyUserQuery} from "../../api/authApiSlice.ts";


const expiryTimestamp = new Date()
expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 10)

export const RequireAuthentication = () => {
    const location = useLocation();
    const isAuth = useAppSelector(isUserAuthenticated);
    const {data, isFetching} = useGetMyUserQuery()
    return (
        isFetching ?
            <></>
            :
            isAuth && data ?
            <Outlet/>
            :
            <Navigate to={`/login?returnUrl=${location.pathname}`} state={{from: location}} replace/>
    )
}