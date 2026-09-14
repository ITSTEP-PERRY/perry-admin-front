import type {AnchorProps} from "antd";
import {header3} from "../../theme/headerStyles.ts";

export const createOrUpdateProductPageAnchorStyles : AnchorProps["styles"] = {
    root: {
        // paddingLeft: "1rem",
        marginLeft: "100px"
    },
    item: {
        ...header3
    },
    indicator: {
        color: "red",
    },
    itemTitle: {

    }
}