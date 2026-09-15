import {useHealthCheckQuery} from "../../api/authApiSlice.ts";
import {Outlet} from "react-router";
import {Flex, Result, Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

export const HealthCheck = () => {
    const {data, isFetching} = useHealthCheckQuery()
    const health = data?.status === "ok"

    // useEffect(() => {
    //     const int = setInterval(() =>{
    //         refetch()
    //     },1000)
    //
    //     return () => {
    //         clearInterval(int)
    //     }
    // });

    return (
         isFetching ?
             <Flex style={{height:'100vh'}} align={'center'} justify={"center"}>
                 <Spin indicator={<LoadingOutlined style={{ fontSize: 72 }} spin />} />
             </Flex>
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