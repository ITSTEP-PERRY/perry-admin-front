import {type ComponentProps} from "react";
import "./css/checkbox.css"
import {TickIcon} from "../Icon/TickIcon.tsx";
import {MinusIcon} from "../Icon/MinusIcon.tsx"
import {checkbox, checkboxActive, labelStales} from "./css/checkboxStyles.ts";

export interface CheckboxProps extends ComponentProps<"input"> {
    checked?: boolean;
    indeterminate?: boolean;
}

export const Checkbox = ({checked,indeterminate,onChange,children,...props}: CheckboxProps) => {
    return (
        <label style={labelStales}>
            <input type={"checkbox"} checked={checked} onChange={(e) => {
                if(onChange) onChange(e)
            }} {...props}/>
            <div style={(checked || indeterminate) ? checkboxActive : checkbox} aria-hidden={true}>
            {indeterminate ? <MinusIcon width={4} size={15}/>
                : checked && !indeterminate ? <TickIcon size={5}/>: null
            }
            </div>
            <span>{children}</span>
        </label>
    )
}