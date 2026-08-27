import type {CSSProperties} from "react";
import {text2} from "../../../theme/textStyles.ts";
import {colors} from "../../../theme/colors.ts";

export const multipleSelectStyles: Record<string, CSSProperties> = {
    root:{
        position: "relative",
        width: "fit-content",
    },
    container: {
        display: "flex",
        justifyContent: "space-between",
        border: "2px solid #0E204280",
        borderRadius: 4,
        padding: "8px 20px",
    },
    input: {...text2},
    popup: {
        marginTop: 5,
        position: "absolute",
        width: "420px",
        display: "flex",
        flexDirection: "column",
        padding: "16px 12px",
        zIndex: 1000,
        backgroundColor: "white",
        border: "1.5px solid #0E204280",
        borderRadius: 4,
        boxShadow: "0px 4px 8px 0px #08080840"

},
    itemContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px",
        borderRadius: 4
    },
    selected: {
        backgroundColor: colors.blue,
    }
}