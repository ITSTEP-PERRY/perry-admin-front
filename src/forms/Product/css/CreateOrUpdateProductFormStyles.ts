import type {FormProps} from "antd";
import type {NestedStyles} from "../../../types/NestedStyles.ts";

export const createOrUpdateProductFormStyles: FormProps["styles"] = {
    root: {
        overflowY: "auto", position: "relative"
    },
    help: {
        padding: "10px 20px",
    },
}

export const createOrUpdateProductFormStyle: NestedStyles = {
    block: {
        marginTop: 50
    },
    spin: {
        position: 'sticky',
        top: '0',
        zIndex: 1000,
        backgroundColor: '#2222',
    }
}