import type {ComponentProps, CSSProperties} from "react";
import {Select, type Tooltip} from "antd";
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
            padding: "16px 12px",
            border: "2px solid #0E204280",
            borderRadius: 4,
            boxShadow: "0px 4px 8px 0px #08080840"

},
        listItem: {
            ...text2,
        },
        list: {
            // gap: 16,
            textAlign: "center",
            // padding: "0 20px",
            marginTop: "5px",
        }
    },
    content: {
    },
}

export const selectIconStyles: Record<string, CSSProperties> = {
    root: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 14,
        alignItems: "center",

    },
    input: {
      width: "1px",
    },
    placeholder: {
        display: "flex",
        width: "48px",
        height: "48px",
        border: "1.5px solid #0E204280",
        borderRadius: 4,
        padding: 4,

    },
    suffix: {
    },
    popupContainer: {
        display: "flex",
        flexDirection: "row",
        position: "absolute",
        marginTop: 5,
        zIndex: 1000,
        width: "456px",
        border: "1.5px solid #0E204280",
        borderRadius: 4,
        backgroundColor: colors.objects,
        padding: 20,
        flexWrap: "wrap",
        boxShadow: "0px 4px 16px 0px #08080840",
        gap: 10

    },
    optionButton: {
        padding: 8,
        borderRadius: 2,
        height: "fit-content",
    },

}

export const selectIconTooltipStyles: ComponentProps<typeof Tooltip>["styles"] = {
    root:{
    },
    arrow: {
        marginTop: -15
    },
    container: {
        marginTop: -15
    }

}