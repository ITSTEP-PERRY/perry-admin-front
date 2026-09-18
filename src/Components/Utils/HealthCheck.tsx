import {useHealthCheckQuery} from "../../api/slices/authApiSlice.ts";
import {Outlet} from "react-router";
import {Result} from "antd";
import {CustomSpin} from "./CustomSpin.tsx";

export const HealthCheck = () => {
    const {data, isFetching} = useHealthCheckQuery()
    const health = data?.status === "ok"


    return (
         isFetching ?
             <CustomSpin text={"Checking services health..." } style={{height: "100vh"}}/>
            :
             health ?
                 <Outlet />
                 :
            <Result
                status="500"
                title="500"
                subTitle="Sorry, something went wrong."
            />
    )
}