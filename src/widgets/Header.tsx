import {Flex, Space} from "antd";
import {container} from "./css/headerStyles.ts";
import {PerryButton} from "../Components/Buttons/PerryButton.tsx";
import {MenuDrawer} from "./MenuDrawer.tsx";
import {Button} from "../Components/Buttons/Button.tsx";
import {UserIcon} from "../Components/Icon/UserIcon.tsx";
import {colors} from "../theme/colors.ts";

export const Header = () => {
    return (
        <Flex justify="space-between" align={"center"} style={container}>
            <Space>
                <MenuDrawer />
                <PerryButton />
            </Space>
            <Button type={"text"} style={{padding: 0}}>
                <UserIcon size={32} color={colors.objects} />
            </Button>
        </Flex>
    )
}