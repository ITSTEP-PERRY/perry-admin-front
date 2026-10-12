import type {NestedStyles} from "../../../types/NestedStyles.ts";
import {text1, text2} from "../../../theme/textStyles.ts";
import {colors} from "../../../theme/colors.ts";
import type {RangePickerProps} from "antd/es/date-picker";

export const datePicker: NestedStyles = {
    wrapper: {
        width: "100%",
        position: "relative",
        zIndex: 1000,
    },
    root: {
        // padding: "8px 18px",
        // border: "1px solid",
        borderRadius: 4,
        // borderColor: colors.objects,
        // backgroundColor: colors.darkBlue,
        marginBottom: 5,
    },
    input: {
        ...text2,
        color: colors.objects
    },
    menu: {
        position: "absolute",
        width: "240px",
        backgroundColor: colors.objects,
        borderRadius: 4,
        padding: 5,
        right: 0,
    },
    menuButton: {
        ...text1,
        padding: 10,
        width: "100%",
        textAlign: "center",
        // marginBottom: 5
    }
}

export const rangePickerStyles: RangePickerProps["styles"] = {
    root: {
        border: "none",
    },
    input: {

    },
    suffix: {
        display: "none",
    }
}