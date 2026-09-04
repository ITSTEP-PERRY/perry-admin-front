import type {CSSProperties} from "react";

export interface NestedStyles {
    [key: string]: CSSProperties | NestedStyles;
}
