import {Flex, Space, Tooltip} from "antd";
import {container} from "./css/headerStyles.ts";
import {PerryButton} from "../Components/Buttons/PerryButton.tsx";
import {MenuDrawer} from "./MenuDrawer.tsx";
import {Button} from "../Components/Buttons/Button.tsx";
import {UserIcon} from "../Components/Icon/UserIcon.tsx";
import {colors} from "../theme/colors.ts";
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {getGlobalFilters, resetGlobalFilters, setGlobalFilters} from "../app/slices/globalFilterSlice.ts";
import {GrPowerReset} from "react-icons/gr";
import {CustomDatePicker} from "../Components/Inputs/CustomDatePicker.tsx";

export const Header = () => {
    const filters = useAppSelector(getGlobalFilters)
    const dispatch = useAppDispatch()

    return (
        <Flex justify="space-between" align={"center"} style={container}>
            <Space>
                <MenuDrawer />
                <PerryButton />
            </Space>
            <Space size={"large"}>
                {Object.values(filters).some(f => f) && <Tooltip title={"Reset global filters"} color={colors.objects}>
                    <Button type={"text"}
                            style={{padding: 0}}
                            onClick={() => dispatch(resetGlobalFilters())}
                    >
                        <GrPowerReset size={32} color={colors.objects}/>
                    </Button>
                </Tooltip>}
                <CustomDatePicker value={filters.dateRange} onChange={dates => dispatch(setGlobalFilters({
                    ...filters,
                    dateRange: dates,
                }))} />
                <a href={"https://" + import.meta.env.VITE_BASE_DOMAIN + "/account/settings"}>
                <Button type={"text"} style={{padding: 0}}>
                    <UserIcon size={32} color={colors.objects} />
                </Button>
                </a>
            </Space>
        </Flex>
    )
}