import type {ComponentProps, CSSProperties} from "react";
import {Modal} from "antd";
import {colors} from "../../../theme/colors.ts";

export const ccModalStyles: ComponentProps<typeof Modal>["styles"] = {
    container: {
        borderRadius: 8,
        padding: 24,
    }
}

export const ccmStyle: Record<string, CSSProperties> = {
    flexContainer: {
      margin: "20px 0"
    },
    addImgButton: {
        width: 128,
        height: 128,
        borderRadius: 4,
        padding: 32,
        backgroundColor: colors.lightBlue,
    },
    nameInput: {
        width: "100%",
        margin: 5
    },
    image: {
        objectFit: "cover",
        borderRadius: 4,
    },
    radioButtons: {
        borderRadius: 4,
        padding: "8px 12px",
        width: 124,
        height: 44,
        textAlign: "center",
        border: "none",
    },
    footerCancelButtons: {
        padding: "8px 12px",
        width: 137,
        height: 47,
    },
    footerCreateButton: {
        padding: "8px 12px",
        width: 184,
        height: 47,
    }
}