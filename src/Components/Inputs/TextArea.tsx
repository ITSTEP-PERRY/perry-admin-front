import {default as AntdTextArea, type TextAreaProps as AntdTextAreaProps} from "antd/es/input/TextArea";
import {textAreaLabelStyles, textAreaStyles} from "./css/inputStyles.ts";
import {Form} from "antd";
import {colors} from "../../theme/colors.ts";

export interface TextAreaProps extends AntdTextAreaProps {
    label?: string;
}

export const TextArea = ({label, ...props}: TextAreaProps) => {
    const {status} = Form.Item.useStatus()

    return (
        <div style={{position: "relative"}}>
            <label htmlFor="textArea" style={{...textAreaLabelStyles,
                color: status === "error" ? colors.destructive : colors.darkText
            }}>{label}</label>
            <AntdTextArea {...props} styles={textAreaStyles(status)} />
        </div>
    )
}