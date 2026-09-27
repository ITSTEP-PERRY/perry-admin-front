import type {NestedStyles} from "../../types/NestedStyles.ts";
import {text3} from "../../theme/textStyles.ts";

export  const ReviewPageStyles: NestedStyles = {
    productImage: {
        width: 50,
        borderRadius: 4,
    },
    avatarText: {
        ...text3,
        lineHeight: 0,
        textWrap: "nowrap",
    },
    reviewText: {
        ...text3,
        textWrap: "wrap",
    },
    rate: {
        textWrap: "nowrap",
    },
    muteButton: {
        padding: 10,
    },
    resetButton: {
        padding: 0
    },
    statCol: {
        boxShadow: "0px 4px 11.5px -5px #2050AD40",
        backgroundColor: "white",
        borderRadius: 8,
        padding: 24,
    },
    row: {
        marginTop: 20
    },
    switch: {
        // backgroundColor: colors.darkText
    }
}


