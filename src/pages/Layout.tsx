import {Layout as AntdLayout} from "antd";
import {Outlet} from "react-router";
import {Header} from "../widgets/Header.tsx";

export const Layout = () => {
    return (
        <AntdLayout>
            <Header />
            <Outlet />
        </AntdLayout>
    )
}