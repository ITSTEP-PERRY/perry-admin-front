import type {NestedStyles} from "../../../types/NestedStyles.ts";
import {text2} from "../../../theme/textStyles.ts";
import {colors} from "../../../theme/colors.ts";

export const orderDetailsDrawerStyles: NestedStyles = {
    itemImage: {
        width: 70,
        borderRadius: 4,
    },
    product: {
    },
    numbers: {
        textAlign: "end",
    },
    itemsCount: {
        textAlign: "center",
    },
    itemsRow: {
    },
    email: {
        ...text2,
        color: colors.secondary,
    }
}