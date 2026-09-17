import {LoginForm} from "../forms/auth/LoginForm.tsx";
import {Flex} from "antd";
import {useAppSelector} from "../app/hooks.ts";
import {isUserAuthenticated} from "../app/slices/userSlice.ts";
import {useGetMyUserQuery} from "../api/slices/authApiSlice.ts";
import {Navigate} from "react-router";

export const LoginPage = () => {
    const isAuth = useAppSelector(isUserAuthenticated);
    const {data, isFetching} = useGetMyUserQuery()
    return (
        isFetching ? <></> :
        isAuth && data ? <Navigate to={"/"} /> :
        <Flex vertical justify={"center"} align={"center"} style={{height: "100vh"}} >
            <LoginForm />
        </Flex>
    )
}