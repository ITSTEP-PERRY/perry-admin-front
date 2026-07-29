import type {FormDeepStylesType} from "../../../types/DeepStylesTypes/FormDeepStylesType.ts";
import type {InputDeepStylesType} from "../../../types/DeepStylesTypes/InputDeepStylesType.ts";
import {colors} from "../../../theme/colors.ts";
import type {CSSProperties} from "react";
import {text3} from "../../../theme/textStyles.ts";

export const loginFormStyles: FormDeepStylesType = {
    help: {
        padding: "5px 20px",
        ...text3
    },
    root: {
        height: 574,
        width: 450,
        background: "#F2F4F8",
    }
}

export const loginFormStyle: CSSProperties = {
    height: "100%",
}
export const loginFormItemStyles:CSSProperties = {
    margin: "0",
}

export const inputErrorStyles: InputDeepStylesType = {
    root: {
        borderColor: colors.inputBorder,
    },
    prefix: {
        color: colors.destructive,
    }
}