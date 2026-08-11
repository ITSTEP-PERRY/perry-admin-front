import type {ComponentProps} from "react";
import {Select} from "antd";
import {colors} from "../../../theme/colors.ts";
import {text2} from "../../../theme/textStyles.ts";

export const selectStyles: ComponentProps<typeof Select>["styles"] = {
    root: {
        border: '2px solid',
        borderColor: colors.inputBorder,
        borderRadius: 4,
        padding: "8px 20px",
    },
    popup: {
        root:{
            justifyItems: "normal",
            padding: "20px",
        },
        listItem: {
            ...text2
        },
        list: {
            gap: 16,
            justifyItems: "start",
            padding: "0 20px",
            marginTop: "5px",
        }
    },
    content: {
    },
}