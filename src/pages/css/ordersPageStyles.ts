import type {RangePickerProps} from "antd/es/date-picker";
import {colors} from "../../theme/colors.ts";
import type {NestedStyles} from "../../types/NestedStyles.ts";
import type {TabsProps} from "antd";
import {text2} from "../../theme/textStyles.ts";

export const ordersRangePickerStyles : RangePickerProps["styles"] = {
    root: {
        border: "2px solid",
        borderColor: colors.inputBorder,
        borderRadius: 4,
        height: 40,
    }
}

export const orderPageTabsStyles: TabsProps["styles"] = {
    item: {
        ...text2,
        color: colors.inputBorder,

    },
    indicator: {
        backgroundColor: colors.secondary,
    },

}

export const ordersPageStyles: NestedStyles = {
    statusTag: {
        borderRadius: 4,
        // padding: "8px 12px",
        // fontSize: 12,
    },
    statusCard: {
        margin: "10px 0",
    },
    tableCol: {
        // width: "55%",
    },
    filterCol: {
        boxShadow: "0px 4px 11.5px -5px #2050AD40",
        backgroundColor: "white",
        borderRadius: 8,
        padding: 24,
    },
    orderStatusChart: {
        // width: "40%",
    }
}