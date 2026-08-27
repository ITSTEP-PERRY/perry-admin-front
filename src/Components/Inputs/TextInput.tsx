import {Form, Input, type InputProps} from "antd";
import {inputErrorsStyles, inputStyles} from "./css/inputStyles.ts";
import {mergeComponentStyles} from "../../utils/merge/mergeComponentStyles.ts";
import type {InputDeepStylesType} from "../../types/DeepStylesTypes/InputDeepStylesType.ts";


export const TextInput = ({styles, ...props}: InputProps) => {
    const { status } = Form.Item.useStatus();
    let customStyles = inputStyles;
    const st = styles as InputDeepStylesType
    if(inputStyles && st) {
        customStyles = mergeComponentStyles(inputStyles, st);
    }
    const errStyles = status === "error" ? inputErrorsStyles : undefined
    return (
        <Input styles={{...customStyles,
            prefix: {...customStyles?.prefix,...errStyles?.prefix},
            root: {...customStyles?.root,...errStyles?.root},
        }}
               status={"error"} {...props}
        />
    )
}