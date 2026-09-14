import type {TableProps} from "antd";
import {colors} from "./colors.ts";
import {text1} from "./textStyles.ts";

export const antdPageTableStyles = <T>(): TableProps<T>["styles"] => ({
    section: {
        borderRadius: 4
    },
    body: {

        cell: {
            border: "none",
            backgroundColor: "none",

        },
        row: {
            backgroundColor: "none",
        },
        wrapper: {
        }
    },
    content: {
        boxShadow: "none",
        border: "none",
        borderRadius: 0,
        backgroundColor: "none",
        minHeight: "70vh",
    },
    header: {
        cell: {
            borderBottom: `2px solid ${colors.lightBlue}`,
            borderTop: `2px solid ${colors.lightBlue}`,
            borderRadius: 0,
            justifyItems: "start",
            backgroundColor: "white",
            ...text1
        },
        row:{
        },
        wrapper: {
        }
    },
    pagination: {
        item: {

        },
        root: {
        }
    },
})