import type {ReactNode} from "react";

export type SelectOptions = {
    label?: ReactNode;
    tooltip?: string
    value?: number | string;
}