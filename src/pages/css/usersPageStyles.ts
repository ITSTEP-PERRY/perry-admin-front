import type {ComponentProps, CSSProperties} from "react";
import type {Select} from "../../Components/Select/Select.tsx";

export const usersPageStyles: Record<string, CSSProperties> = {
    root: {
        margin: "0 auto",
        height: "100%",
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

