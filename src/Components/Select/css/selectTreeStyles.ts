import type {CSSProperties} from "react";
import {colors} from "../../../theme/colors.ts";
import {text2, text3} from "../../../theme/textStyles.ts";

export const selectTreeStyles: Record<string, CSSProperties> = {
    root: {
        width: "100%",
        position: "relative",

    },
    container: {
        display: "flex",
        border: `1.5px solid ${colors.inputBorder}`,
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 4,
        padding: "8px 20px",

    },
    containerSelected: {
        borderColor: "black",
    },
    label: {
        position: "absolute",
        top: -12,
        backgroundColor: "white",
        padding: "0 5px",
        ...text3
    },
    input: {

    },
    placeholder: {
        ...text2,
        color: "#888888",
    },
    suffix: {
        display: "flex",
        alignItems: "center",
    },
    popup: {
        position: "absolute",
        width: "100%",
        // height: "312px",
        padding: 16,
        backgroundColor: "#FAFAFA",
        marginTop: 8,
        zIndex: 1000,
        boxShadow: "0px 4px 16px 0px #03060D1A",
        borderRadius: 4,
        border: `1.5px solid ${colors.inputBorder}`,
        overflowY: "auto",
        scrollbarWidth: "none",
    },
}


export const selectNodeStyles: Record<string, CSSProperties> = {
    root: {
        width: "100%",
},
    container: {
        display: "flex",
        justifyContent: "space-between",
        padding: "16px",
        borderRadius: 4,
    },
    innerContainer: {
        paddingLeft: 32,
    },
    label: {
        ...text2,
        cursor: "pointer",

    },
    suffixContainer:{
        display: "flex",
        gap: 15,
        alignItems: "baseline",
    }

}