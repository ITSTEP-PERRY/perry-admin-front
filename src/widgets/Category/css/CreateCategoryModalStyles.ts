import type {ComponentProps, CSSProperties} from "react";
import {type Form, Modal} from "antd";
import {colors} from "../../../theme/colors.ts";

export const ccModalStyles: ComponentProps<typeof Modal>["styles"] = {
    container: {
        borderRadius: 8,
        padding: 24,
    }
}

export const ccmFormStyles: ComponentProps<typeof Form>["styles"] = {
    helpItem: {
        margin: "5px 0 20px 20px"
    },
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
        margin: 5,
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
    },

    propsContainer:{
        backgroundColor: colors.lightBlue,
        margin: 0,
        padding: 0,
    },
    propsItem:{
        width: "100%",
        padding: 0,
        margin: "15px 0",
        alignSelf: "center",
    },
    addProps:{
        justifyContent: "start",
        padding: "20px",
        marginTop: 10
    },
    error: {
        color: "red",
        borderColor: colors.inputBorder
    }
}