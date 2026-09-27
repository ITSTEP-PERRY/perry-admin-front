import type {NestedStyles} from "../../../types/NestedStyles.ts";

export const orderStatusChartStyle : NestedStyles = {
    root: {
        borderRadius: 4,
        border: "1px solid",
        borderColor: "rgb(34 34 34 / 0.27)",
        padding: "5px 20px 20px 20px",
        boxShadow: "0px 4px 11.5px -5px #2050AD40",
    },
    total: {
        margin: "15px 0",

    },
    values: {
        borderLeft: "3px solid",
        paddingLeft: 5,
        margin: "10px 0"
    },
    tooltip: {
        color: "white"
    }
}