import {Button} from "../Components/Buttons/Button.tsx";
import {MenuIcon} from "../Components/Icon/MenuIcon.tsx";
import {Avatar, Divider, Drawer, Flex} from "antd";
import {cloneElement, useState} from "react";
import {DoubleRightIcon} from "../Components/Icon/DoubleRightIcon.tsx";
import {
    menuDrawerButtonStyles,
    menuDrawerDividerStyles,
    menuDrawerNameStyles,
    menuDrawerStyles
} from "./css/menuDrawerStyles.ts";
import {colors} from "../theme/colors.ts";
import Text from "antd/es/typography/Text";
import {text2, text3} from "../theme/textStyles.ts";
import {UsersIcon} from "../Components/Icon/UsersIcon.tsx";
import {UserIcon} from "../Components/Icon/UserIcon.tsx";
import {CategoryIcon} from "../Components/Icon/CategoryIcon.tsx";
import {ProductsIcon} from "../Components/Icon/ProductsIcon.tsx";
import {OrdersIcon} from "../Components/Icon/OrdersIcon.tsx";
import {ReviewsIcon} from "../Components/Icon/ReviewsIcon.tsx";
import {LogoutIcon} from "../Components/Icon/LogoutIcon.tsx";
import {useNavigate} from "react-router";


const demmyData = {
    icon: <UserIcon />,
    name: "Sherman Porter",
    role: "Administrator",
}

const menuItems = [
    {
        icon: <UsersIcon />,
        title: "Users",
        path:"users"
    },{
        icon: <CategoryIcon />,
        title: "Category",
        path: "category",
    },{
        icon: <ProductsIcon />,
        title: "Products",
        path:"products"
    },{
        icon: <OrdersIcon />,
        title: "Orders",
        path:"orders"
    },{
        icon: <ReviewsIcon />,
        title: "Reviews",
        path:"reviews"
    },
]


export const MenuDrawer = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const onMenuSelected = (path: string) => {
        setOpen(false);
        navigate(path)
    }

    return (
        <>
            <Button type={"text"} style={{padding: "9px"}} onClick={() => setOpen(true)}>
                <MenuIcon color="white" size={32}/>
            </Button>

            <Drawer open={open}
                    styles={menuDrawerStyles}
                    placement={"left"}
                    closeIcon={<DoubleRightIcon size={"56"} color={colors.secondary} width={3}/>}

                    size={"365px"}
                    onClose={() => setOpen(false)}>
                <Flex>
                    <Flex vertical gap={8}>
                        <Avatar size={"large"} icon={demmyData.icon} />
                        <Text style={menuDrawerNameStyles}>{demmyData.name}</Text>
                        <Text style={text3}>{demmyData.role}</Text>
                    </Flex>
                </Flex>

                <Divider vertical={false} style={menuDrawerDividerStyles} />

                <Flex vertical gap={16}>
                        {menuItems.map((item, i) => (
                            <Button type={"text"} key={i} style={menuDrawerButtonStyles} onClick={() => onMenuSelected(item.path)}>
                                {cloneElement(item.icon, {size: 32, color: colors.darkText})}
                                <Text style={text2}>{item.title}</Text>
                            </Button>
                        ))}
                </Flex>

                <Divider vertical={false} style={menuDrawerDividerStyles} />

                <Button type={"text"} style={menuDrawerButtonStyles}>
                    <LogoutIcon size={32}  color={colors.darkText} />
                    <Text style={text2}>Logout</Text>
                </Button>
            </Drawer>
        </>
    )
}