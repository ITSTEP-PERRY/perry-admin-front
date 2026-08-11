import type {ComponentProps} from "react";
import {colors} from "../../../theme/colors.ts";
import type {Input} from "antd";

export const baseSearchInputStyles: ComponentProps<typeof Input>["styles"] = {
    root: {
        borderWidth: "2px",
        borderColor: colors.inputBorder,
        padding: "8px 20px",
        borderRadius: 4,
    },
}