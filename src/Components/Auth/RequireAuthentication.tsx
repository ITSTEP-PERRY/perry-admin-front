import {Navigate, Outlet, useLocation} from "react-router";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {isUserAuthenticated, setMe} from "../../app/slices/userSlice.ts";
import {useGetMyUserQuery} from "../../api/slices/authApiSlice.ts";
import {CustomSpin} from "../Utils/CustomSpin.tsx";
import {useEffect} from "react";


const expiryTimestamp = new Date()
expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 10)

export const RequireAuthentication = () => {
    const location = useLocation();
    const isAuth = useAppSelector(isUserAuthenticated);
    const dispatch = useAppDispatch();
    const {data, isFetching} = useGetMyUserQuery()

    useEffect(() => {
        if(isAuth && data) {
            dispatch(setMe(data))
        }
    },[dispatch, isAuth, data])
    
    return (
        isFetching ?
            <CustomSpin text={"Authenticating..."} style={{height: "100vh"}}/>
            :
            isAuth && data ?
            <Outlet />
            :
            <Navigate to={`/login?returnUrl=${location.pathname}`} state={{from: location}} replace/>
    )
}