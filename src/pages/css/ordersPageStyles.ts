import type {RangePickerProps} from "antd/es/date-picker";
import {colors} from "../../theme/colors.ts";
import type {NestedStyles} from "../../types/NestedStyles.ts";

export const ordersRangePickerStyles : RangePickerProps["styles"] = {
    root: {
        border: "2px solid",
        borderColor: colors.inputBorder,
        borderRadius: 4,
    }
}

export const ordersPageStyles: NestedStyles = {
    statusTag: {
        borderRadius: 4,
        // padding: "8px 12px",
        // fontSize: 12,
    }
}