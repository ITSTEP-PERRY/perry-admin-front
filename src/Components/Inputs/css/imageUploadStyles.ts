import type {NestedStyles} from "../../../types/NestedStyles.ts";

export const imageUploadStyles: NestedStyles = {
    image: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    },
    button: {
        padding: 0,
        zIndex: 1000,
    }
}