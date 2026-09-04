import {type ReactNode, useState} from "react";
import {selectIconStyles, selectIconTooltipStyles} from "./css/selectStyles.ts";
import {ArrowUpIcon} from "../Icon/ArrowUpIcon.tsx";
import {ArrowDownIcon} from "../Icon/ArrowDownIcon.tsx";
import {Empty, type SelectProps, Tooltip} from "antd";
import "./css/styles.css"
import {colors} from "../../theme/colors.ts";
import type {SelectOptions} from "../../types/selectOptions.ts";



export interface SelectIconProps extends SelectProps{
    suffix?: ReactNode;
    options?: SelectOptions[];
    placeholder?: ReactNode;
    value?: number | string;
    onSelect?: (value: number | string) => void;
    currentValue? :SelectOptions;
}

export const SelectIcon = (props: SelectIconProps) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<SelectOptions | undefined>(props.currentValue);

    const actualSuffix = props.suffix ? props.suffix : open ? <ArrowUpIcon size={18}/> : <ArrowDownIcon size={18}/>;
    const actualPlaceholder = value?.label ? value.label : props.placeholder;

    return (
        <div style={{position: "relative"}}>
            <div style={selectIconStyles.root} onClick={() => setOpen(!open)}>
                <div style={selectIconStyles.placeholder}>{actualPlaceholder}</div>
                <span style={selectIconStyles.suffix}>{actualSuffix}</span>
            </div>
            {open && <div style={selectIconStyles.popupContainer}>
                {props.options ?
                    props.options.map((child, index) => (
                        <Tooltip key={index} placement="bottom" title={child.tooltip} styles={selectIconTooltipStyles} color={colors.blue}>
                            <div
                                className={"optionButton"}
                                style={{...selectIconStyles.optionButton,
                                    backgroundColor: child.value == value?.value ? colors.lightBlue : "none"}}
                                onClick={() => {
                                    setValue(child)
                                    setOpen(!open)
                                    if(props.onSelect) props.onSelect(child.value ?? "")
                                }}
                            >
                                {child.label}
                            </div>
                        </Tooltip>
                    ))
                : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
                }
            </div>}
        </div>
    )
}