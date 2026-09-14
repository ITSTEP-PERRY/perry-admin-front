import {Navigate, Outlet, useLocation} from "react-router";
import {useAppSelector} from "../../app/hooks.ts";
import {isUserAuthenticated} from "../../app/slices/userSlice.ts";

export const RequireAuthentication = () => {
    const location = useLocation();
    const isAuth = useAppSelector(isUserAuthenticated);
    return (
        isAuth ?
            <Outlet/>
            :
            <Navigate to={`/login?returnUrl=${location.pathname}`} state={{from: location}} replace/>
    )
}