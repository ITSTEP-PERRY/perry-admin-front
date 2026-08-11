import {Input, type InputProps} from "antd";
import {SearchIcon} from "../Icon/SearchIcon.tsx";
import {baseSearchInputStyles} from "./css/baseSearchStyles.ts";

export const BaseSearch = ({...props}: InputProps) => {
    return (
        <Input
            prefix={<SearchIcon size={"24px"} width={2}/>}
            styles={baseSearchInputStyles}
            placeholder={"Search..."}
            {...props}
        />
    )
}