import type {ComponentProps, CSSProperties} from "react";
import {type TableProps} from "antd";
import type {UserData} from "../../types/UserData.ts";
import {colors} from "../../theme/colors.ts";
import {text1} from "../../theme/textStyles.ts";
import type {Select} from "../../Components/Select/Select.tsx";

export const usersPageStyles: Record<string, CSSProperties> = {
    root: {
        margin: "0 auto",
        width: "85%",
    },
    statusTag: {
        borderRadius: 4,
        padding: "8px 12px",
    },
    header: {
        margin: "30px 0",
    }
}

export const userPageSelectStyles: ComponentProps<typeof Select>["styles"] = {
    popup: {
        root: {
            width: "420px",
            border: "1.5px solid #0E204280",
            borderRadius: 4,
            padding: "16px 12px",
        },
        listItem: {
            width: "100%",
        },
        list: {
            width: "100%",
        }
    }
}

export const usersPageTableStyles: TableProps<UserData>["styles"] = {
    body: {
        cell: {
            border: "none",
            backgroundColor: "none"
        },
        row: {
            backgroundColor: "none",
        }
    },
    content: {
        boxShadow: "none",
        border: "none",
        borderRadius: 0,
        backgroundColor: "none"
    },
    header: {
        cell: {
            borderBottom: `2px solid ${colors.lightBlue}`,
            borderTop: `2px solid ${colors.lightBlue}`,
            borderRadius: 0,
            backgroundColor: "white",
            ...text1
        },
        row:{
          border: "none"
        },
    },
    pagination: {
        item: {

        },
        root: {
        }
    },
}