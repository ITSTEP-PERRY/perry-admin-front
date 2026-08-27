import type {CSSProperties} from "react";
import {colors} from "../../../theme/colors.ts";
import {text2} from "../../../theme/textStyles.ts";

export const userOptionsStyles: Record<string, CSSProperties> = {
    root: {
        position: "relative"
    },
    popup: {
        position: "absolute",
        right: 100,
        backgroundColor: colors.objects,
        padding: "12px 16px",
        boxShadow: "0px 4px 8px 0px #08080840",
        zIndex: 1000,
        border: "1.5px solid #0E204280",
        borderRadius: 4
    },
    item: {
        ...text2,
        padding: "10px 16px",
        width: "358px",
        justifyContent: "start",
    }
}