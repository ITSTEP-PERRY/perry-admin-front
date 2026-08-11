import type {CSSProperties} from "react";
import {text1} from "../../theme/textStyles.ts";
import {colors} from "../../theme/colors.ts";

export const categoryPageRootStyles: CSSProperties = {
    width:'85%',
    margin: "0 auto",
    padding: 25,
    height: "872px"
}

export const categoryPageSelectStyles: CSSProperties = {
    width: "350px"
}

export const categoryPageBaseSearchStyles: CSSProperties = {
    width: "100%",
}

export const categoryPageDescriptionStyles: CSSProperties = {
    boxShadow: "0px 4px 11.5px -5px #2050AD40",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 24,
}

export const categoryPageEmptyDescriptionStyles: CSSProperties = {
    ...text1,
    backgroundColor: colors.lightBlue,
    padding: "8px 20px",
    borderRadius: 4,
}

export const dividerStyles: CSSProperties = {
    borderWidth: 2,
    borderColor: colors.blue,
    margin: 0
}