import type {CSSProperties} from "react";
import {colors} from "../../theme/colors.ts";

export const categoryTreeStyles: Record<string, CSSProperties> = {
    root: {
        marginTop: 24
    },
    parentCategory: {
        margin: '10px 0',
        padding: "5px 20px",
        borderRadius: 8,
    },
    checkbox: {
        transform: "scale(1.3)",
        borderRadius: 2,
        content: "★"
    }
}

export const categorySelectedStyles:CSSProperties = {
    backgroundColor: colors.lightBlue,
    ...categoryTreeStyles.parentCategory
}

export const categoryNodeStyles:CSSProperties = {
    marginLeft: "20px",
    marginTop: "15px",

}

export const secondCategoryNodeStyles: CSSProperties = {
    marginLeft: "20px",
}