import {useHealthCheckQuery} from "../../api/slices/authApiSlice.ts";
import {Outlet} from "react-router";
import {Result} from "antd";
import {CustomSpin} from "./CustomSpin.tsx";
import {useProductHealthCheckQuery} from "../../api/slices/productApiSlice.ts";

export const HealthCheck = () => {
    const {data, isFetching} = useHealthCheckQuery()
    const {data: productHealth, isFetching: productHealthFetching} = useProductHealthCheckQuery()
    const authHealth = data?.status === "ok"
    const prodHealth = productHealth?.status === "Healthy" && productHealth.database === "up"

    return (
         isFetching && productHealthFetching?
             <CustomSpin text={"Checking service health..." } style={{height: "100vh"}}/>
            :
             authHealth && prodHealth ?
                 <Outlet />
                 :
            <Result
                status="500"
                title="500"
                subTitle="Sorry, something went wrong."
            />
    )
}