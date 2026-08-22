import {type ThemeConfig} from "antd";
import {colors} from "./colors.ts";

export const config: ThemeConfig = {
    token: {
        colorPrimary: colors.primary,
        fontFamily: "Mulish",
        colorTextLightSolid: colors.darkText,
        colorBorderSecondary: colors.secondary
    },
    components:{
        Button: {
            lineWidth: 2.5,
            defaultHoverColor: colors.darkText,
            defaultActiveColor: colors.darkText,

        },
        Input: {
            colorTextLightSolid: colors.darkText,
            colorBorder: colors.inputBorder,
            hoverBorderColor: colors.inputBorder,
            activeBorderColor: colors.inputBorder,
            borderRadius: 4,
        },
        Checkbox: {
            colorWhite: colors.darkText,
            colorBorder: colors.inputBorder,
            lineWidth: 1.5,
            borderRadius: 2,
            size: 24,

        },
        Typography: {
            colorText: colors.darkText,
            colorTextHeading: colors.darkText,
            titleMarginBottom: 0,
        },
        Divider: {
            colorSplit: colors.lightBlue,
            lineWidth: 2.5,
            marginLG: 10
        },
        Radio:{
            colorPrimary: colors.blue,
            colorTextLightSolid: colors.darkText,
            colorPrimaryHover: colors.blue,
        }
    }
}

