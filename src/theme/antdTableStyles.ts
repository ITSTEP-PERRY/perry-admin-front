import type {TableProps} from "antd";
import {colors} from "./colors.ts";
import {text2,} from "./textStyles.ts";

export const antdPageTableStyles = <T>(): TableProps<T>["styles"] => ({
    root: {
        height: "100%",
        overflowX: "auto",
    },
    section: {
        borderRadius: 4,
        height: "70vh",

    },
    body: {

        cell: {
            border: "none",
            backgroundColor: "none",

        },
        row: {
            backgroundColor: "none",
            maxHeight: "1px",
            // minHeight: "1px",
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
            ...text2
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