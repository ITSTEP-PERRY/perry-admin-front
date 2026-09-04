import {Select as AntdSelect, type SelectProps} from "antd"
import {selectStyles} from "./css/selectStyles.ts";
import {useState} from "react";
import {ArrowDownIcon} from "../Icon/ArrowDownIcon.tsx";
import {ArrowUpIcon} from "../Icon/ArrowUpIcon.tsx";
import {colors} from "../../theme/colors.ts";
import type {InputDeepStylesType} from "../../types/DeepStylesTypes/InputDeepStylesType.ts";
import {mergeComponentStyles} from "../../utils/merge/mergeComponentStyles.ts";
import type {NestedStyles} from "../../types/NestedStyles.ts";

export const Select = ({styles, prefix,...props}: SelectProps) => {
    const [open, setOpen] = useState(false);

    let customStyles = selectStyles;
    const st = styles as InputDeepStylesType
    if(selectStyles && st) {
        customStyles = mergeComponentStyles(selectStyles as NestedStyles, st);
    }
    return (
        <AntdSelect styles={customStyles}
                    prefix={prefix}
                    {...props}
                    suffix={open ? <ArrowUpIcon size={18} width={2} color={colors.darkText}/> : <ArrowDownIcon width={2} size={18} color={colors.darkText}/>}
                    onOpenChange={(isOpen) => setOpen(isOpen)}
         />
    )
};