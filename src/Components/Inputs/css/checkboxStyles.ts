import type {CSSProperties} from "react";
import {colors} from "../../../theme/colors.ts";
import {text1} from "../../../theme/textStyles.ts";

export const checkbox: CSSProperties = {
        display: "flex",
        width: "24px",
        height: "24px",
        border: `1px solid ${colors.inputBorder}`,
        borderRadius: "4px",
    }
export const checkboxActive: CSSProperties = {
        ...checkbox,
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
        border: "none",
}

export const labelStales: CSSProperties = {
        ...text1,
        display: "flex",
        alignItems: "center",
        gap: "16px",
}
