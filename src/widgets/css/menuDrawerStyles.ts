import type {ComponentProps, CSSProperties} from "react";
import {colors} from "../../theme/colors.ts";
import type {Drawer} from "antd";
import {text1} from "../../theme/textStyles.ts";

export const menuDrawerStyles: ComponentProps<typeof Drawer>["styles"] = {
    close: {
        position: "absolute",
        top: "24px",
        left: "389px" ,
        backgroundColor: colors.lightText,
        borderRadius: "50px",
        padding: "8px",
        width: "56px",
        height: "56px",
    },
    header: {
        padding: 0,
    },
    body: {
        padding: "24px",
    }
}

export const menuDrawerNameStyles: CSSProperties = {
    ...text1,
    fontWeight: "600",
    fontStyle: "SemiBold",
    letterSpacing: "0",
}

export const menuDrawerDividerStyles: CSSProperties = {
    width: "100%",
    background:"red",
    borderTop: "1.5px solid",
    borderColor: colors.blue,
}

export const menuDrawerButtonStyles: CSSProperties= {
    padding: "0",
    justifyContent: "start",
    width: "100%",
}