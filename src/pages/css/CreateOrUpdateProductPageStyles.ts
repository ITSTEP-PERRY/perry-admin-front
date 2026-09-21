import type {AnchorProps} from "antd";
import {header3} from "../../theme/headerStyles.ts";
import {colors} from "../../theme/colors.ts";
import type {NestedStyles} from "../../types/NestedStyles.ts";

export const createOrUpdateProductPageAnchorStyles : AnchorProps["styles"] = {
    root: {
        // paddingLeft: "1rem",
        // marginLeft: "100px"
    },
    item: {
        ...header3
    },
    indicator: {
        backgroundColor: colors.darkText,
        width: "4px",
    },

    itemTitle: {

    },
}

export const createOrUpdateProductPageAnchorStyle: NestedStyles = {
    buttons: {
        padding: "24px 56px"
    },
    spin:{
        height: "60vh",
    }
}