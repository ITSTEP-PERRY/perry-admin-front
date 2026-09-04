import type {NestedStyles} from "../../types/NestedStyles.ts";
import type {CSSProperties} from "react";

export const productsPageStyles: NestedStyles = {
    root: {
        width:'85%',
        margin: "0 auto",
        padding: 25,
        height: "872px"
    },
    search: {
      width:"665px",
        padding: "5px",
    },
    categories: {
        input: {
            width: "fit-content",
            padding: "8px 20px",
            minWidth: "284px"
        },
        popup: {
            width: "420px",
        }
    } satisfies Record<string, CSSProperties>,
    descriptionContainer: {
        boxShadow: "0px 4px 11.5px -5px #2050AD40",
        backgroundColor: "white",
        borderRadius: 8,
        padding: 24,
    }
}