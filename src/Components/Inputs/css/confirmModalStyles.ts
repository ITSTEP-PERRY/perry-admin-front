import type {ComponentProps, CSSProperties} from "react";
import type {Modal} from "antd";

export const confirmModalStyles: ComponentProps<typeof Modal>["styles"] = {
    container: {
        width: '464px',
        flexDirection: 'column',

    },
    body: {
        height: '85px',
        alignContent: 'center',

    },
    footer: {
    }
}

export const confirmModalStyle: Record<string, CSSProperties> = {
    buttons: {
        padding: "18px",
        width: "100%"
    }
}