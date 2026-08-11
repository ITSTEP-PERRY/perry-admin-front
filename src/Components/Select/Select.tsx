import {Select as AntdSelect, type SelectProps} from "antd"
import {selectStyles} from "./css/selectStyles.ts";
import {useState} from "react";
import {ArrowDownIcon} from "../Icon/ArrowDownIcon.tsx";
import {ArrowUpIcon} from "../Icon/ArrowUpIcon.tsx";
import {colors} from "../../theme/colors.ts";

export const Select = ({prefix,...props}: SelectProps) => {
    const [open, setOpen] = useState(false);
    return (
        <AntdSelect styles={selectStyles}
                    prefix={prefix}
                    {...props}
                    suffix={open ? <ArrowUpIcon size={18} width={2} color={colors.darkText}/> : <ArrowDownIcon width={2} size={18} color={colors.darkText}/>}
                    onOpenChange={(isOpen) => setOpen(isOpen)}
         />
    )
};