import type {NestedStyles} from "../../types/NestedStyles.ts";
import {colors} from "../../theme/colors.ts";

export const dashboardStyles: NestedStyles = {
    leftRoot: {
      width: "75%",
    },
    rightRoot: {
      // width: "25%",
    },
    popularRoot: {
        border: "1px solid",
        width: "fit-content",
        padding: 8,
        borderRadius: 4,
        borderColor: colors.inputBorder,
        boxShadow: "0px 4px 11.5px -5px #2050AD40",

    },
    popularContainer: {
      width: "372px",
    },
    popularItem: {
        borderColor: "#9a9a9a",
        borderRadius: 4,
        // border: "1px solid",
        padding: 4,
        backgroundColor: colors.objects,
        boxShadow: "0px 4px 11.5px -5px #2050AD40",

    },
    popularCol: {
    },
}