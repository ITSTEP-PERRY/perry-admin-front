import {useState} from "react";
import {Button} from "../../Components/Buttons/Button.tsx";
import {ordersPageStyles} from "../../pages/css/ordersPageStyles.ts";
import {VscSettings} from "react-icons/vsc";
import {colors} from "../../theme/colors.ts";
import {Dropdown, Flex, type MenuProps} from "antd";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {getTableSettings, setTableView} from "../../app/slices/tableSettingsSlice.ts";
import {MenuIcon} from "../../Components/Icon/MenuIcon.tsx";
import Text from "antd/es/typography/Text";
import {text3} from "../../theme/textStyles.ts";
import {TickIcon} from "../../Components/Icon/TickIcon.tsx";
import {TbLayoutCards} from "react-icons/tb";

export interface TableSettingsProps {
    open?: boolean,
}



export const TableSettings = () => {
    const [selectedKey, setSelectedKey] = useState<string>("row");
    const tableSettings = useAppSelector(getTableSettings)
    const dispatch = useAppDispatch();

    const items: MenuProps['items'] = [
        {
            label: (
                <Flex justify="space-between" align={"center"}>
                    <Flex align="center" gap={10} >
                        <MenuIcon color={colors.darkText} size={16} />
                        <Text style={text3}>Compact</Text>
                    </Flex>
                    {tableSettings.view === "row" &&  <TickIcon size={8}/>}
                </Flex>
            ),
            onClick: (key) => {

                setSelectedKey(key.key);
                dispatch(setTableView(key.key))
            },
            key: 'row',
        },
        {
            label: (
                <Flex justify="space-between" align={"center"}>
                    <Flex align="center" gap={10} >
                        <TbLayoutCards color={colors.darkText} size={16} />
                        <Text style={text3}>Card</Text>
                    </Flex>
                    {tableSettings.view === "card" &&  <TickIcon size={8}/>}
                </Flex>
            ),
            onClick: (key) => {

                setSelectedKey(key.key);
                dispatch(setTableView(key.key))
            },
            key: 'card',
        },
        {
            type: 'divider',
        },

    ];
    return (
        <>
            <Dropdown styles={{root: {width: "13%"}}}
                menu={{ items, selectable: true, selectedKeys: [selectedKey] }}
                      trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                    <Button style={ordersPageStyles.filterButtonIcon} type={"text"}><VscSettings color={colors.darkText} size={20}/></Button>

                </a>
            </Dropdown>

        </>
    )
}