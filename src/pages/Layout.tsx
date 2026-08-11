import {Layout as AntdLayout} from "antd";
import {Outlet} from "react-router";
import {Header} from "../widgets/Header.tsx";

export const Layout = () => {
    return (
        <AntdLayout style={{ height: "100vh" }}>
            <Header />
            <Outlet />
        </AntdLayout>
    )
}