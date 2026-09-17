import {useGetMyUserQuery} from "../../api/authApiSlice.ts";
import {Outlet, useNavigate} from "react-router";
import {Button} from "../Buttons/Button.tsx";
import {Result} from "antd";

export const RequireAuthorization = ({roles}:{roles: string[]}) => {
    const {data} = useGetMyUserQuery()
    const navigate = useNavigate()
    const isAuth = roles.some((role) => role === data?.role)

    return (
        isAuth ? <Outlet/>
            :
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={<Button type="primary"
                    onClick={() => navigate("/login")}
                >Back Home</Button>}
            />
    )
}