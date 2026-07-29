import {Flex, Space} from "antd";
import {container} from "./css/headerStyles.ts";
import {PerryButton} from "../Components/Buttons/PerryButton.tsx";
import {MenuDrawer} from "./MenuDrawer.tsx";

export const Header = () => {
    return (
        <Flex justify="space-between" align={"center"} style={container}>
            <Space>
                <MenuDrawer />
                <PerryButton />
            </Space>
        </Flex>
    )
}