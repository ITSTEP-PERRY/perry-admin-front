import {Layout as AntdLayout} from "antd";
import {Outlet} from "react-router";
import {Header} from "../widgets/Header.tsx";

export const Layout = () => {
    return (
        <AntdLayout style={{ maxHeight: "100%", backgroundColor: "rgb(0 0 0 / 0.03)" }}>
            <Header />
            <div style={{ width: "95%", margin: "0 auto", overflow: "auto" }}>
                <Outlet />
            </div>
        </AntdLayout>
    )
}