import {type ComponentProps, type CSSProperties, type ReactNode, useState} from "react";
import {multipleSelectStyles} from "./css/multipleSelectStyles.ts";
import type {SelectOptions} from "../../types/selectOptions.ts";
import {text2} from "../../theme/textStyles.ts";
import {TickIcon} from "../Icon/TickIcon.tsx";
import {ArrowUpIcon} from "../Icon/ArrowUpIcon.tsx";
import {ArrowDownIcon} from "../Icon/ArrowDownIcon.tsx";
import {useOutsideClick} from "../../shared/Hooks/useOutsideClick.ts";
import "./css/multipleSelect.css"
import {colors} from "../../theme/colors.ts";
export interface MultipleSelectProps extends Omit<ComponentProps<'input'>, "onSelect">{
    onSelect?: (value: SelectOptions) => void;
    onSelectAll?: () => void;
    values?: SelectOptions[];
    options?: SelectOptions[];
    suffix?: ReactNode;
    title?: string;
    position?: "bottomRight" | "bottomLeft" | "topRight" | "topLeft";
    selectAll?: boolean,
}



export const MultipleSelect = ({values, ...props}: MultipleSelectProps) => {
    const [open, setOpen] = useState(false);

    const ref = useOutsideClick(() => setOpen(false));
    const actualSuffix = props.suffix ? props.suffix : open ? <ArrowUpIcon size={18}/> : <ArrowDownIcon size={18}/>;
    const allSelected = values?.length === props.options?.length

    const handleSelect = (option: SelectOptions) => {
        props.onSelect?.(option)
    }

    let position: CSSProperties = { left: 0 };

    switch (props.position) {
        case "topRight":break;
        case "topLeft":break;
        case "bottomLeft":
            position = {left: 0}
            break;
        case "bottomRight":
            position = {right: 0}
            break;
        default: break
    }

    return (
         <div ref={ref} style={{...multipleSelectStyles.root, ...props.style}}>
             <div style={multipleSelectStyles.container} onClick={() => setOpen(!open)}>
                <span style={multipleSelectStyles.input}>{props.title ? props.title : allSelected ? props.placeholder : values && values[0]?.label}</span>
                <span style={multipleSelectStyles.suffix}>
                    {actualSuffix}
                </span>
             </div>
             {open &&
                 <div style={{...multipleSelectStyles.popup, ...position}}>
                     {props.selectAll && <div className={"item-selected"} onClick={props.onSelectAll}
                           style={{
                               ...multipleSelectStyles.itemContainer,
                               backgroundColor: allSelected ? colors.lightBlue : undefined
                           }}
                     >
                         <span style={text2}>All</span>
                         {allSelected && <TickIcon size={5}/>}
                     </div>}
                    {props.options?.map((option, index) => (
                        <div key={index}
                             className={"item-selected"}
                             style={{...multipleSelectStyles.itemContainer,
                                 backgroundColor: values?.some(v => v.value === option.value) ? colors.lightBlue : undefined}}
                             onClick={() => handleSelect(option)}
                        >
                            <span style={text2}>{option.label}</span>
                            {values?.some(v => v.value === option.value) && <TickIcon size={5}/>}
                        </div>
                    ))}
                </div>
             }
         </div>
    )
}