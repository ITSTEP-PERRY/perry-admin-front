import type {NestedStyles} from "../../../../types/NestedStyles.ts";
import {colors} from "../../../../theme/colors.ts";
import type {ComponentProps} from "react";
import type {DatePicker} from "antd";

export const wishlistStatChartStyles: NestedStyles = {
    root: {
        border: "1px solid",
        borderColor: colors.inputBorder,
        borderRadius: 4,
        padding: 16,
        backgroundColor: colors.objects
    }
}

export const wishlistDatePicker: ComponentProps<typeof DatePicker>["styles"] = {
    root: {
        // padding: 12,
        // height: 20,
    },
    input: {
        padding: 0,
        textAlign: "center"
    },
    suffix: {
        // display: 'none',
    },
    prefix: {
        padding: 0
    }
}