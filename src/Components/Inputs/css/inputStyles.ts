import type {InputDeepStylesType} from "../../../types/DeepStylesTypes/InputDeepStylesType.ts";
import {colors} from "../../../theme/colors.ts";
import type {ComponentProps, CSSProperties} from "react";
import type TextArea from "antd/es/input/TextArea";

export const inputErrorsStyles: InputDeepStylesType = {
    prefix:{
        color: colors.destructive
    },
    count:{},
    input: {},
    root: {
        borderColor: colors.inputBorder,
    }
}

export const inputStyles: InputDeepStylesType = {
    root: {
        margin: "20px 0 0px 0px",
        padding: '12px 20px',
        width: '100%',
        borderColor: colors.inputBorder
    },
    count: {
        position: 'absolute',
            width: 'fit-content',
            padding: '0 4px',
            top: 35,
            right: 10,
            backgroundColor: '#fff',
            fontFamily: "Mulish",
            fontWeight: "400",
            fontSize: '14px',
            color: colors.darkText,
    },
    prefix: {
        position: 'absolute',
            width: 'fit-content',
            padding: '0 4px',
            top: -13,
            left:  "20px",
            backgroundColor: '#fff',
            fontFamily: "Mulish",
            fontSize: '16px',
            fontWeight: "400",
            color: colors.darkText,
    },
    input: {
        fontSize: '18px',
        borderColor: colors.inputBorder,
    }
}


export const textAreaStyles = (status?: string): ComponentProps<typeof TextArea>["styles"]  => ({

    count: {
        position: 'absolute',
        width: 'fit-content',
        padding: '0 4px',
        marginBottom: 11,
        marginRight: 20,
        backgroundColor: '#fff',
        fontFamily: "Mulish",
        fontWeight: "400",
        fontSize: '14px',
        color: status === "error" ? colors.destructive:colors.darkText,
    },
    textarea: {
        padding: "10px 20px",
        color: colors.darkText,

    }
})

export const textAreaLabelStyles : CSSProperties = {
    ...inputStyles.prefix,
    zIndex: 1000
}