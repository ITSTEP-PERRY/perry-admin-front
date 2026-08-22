import {default as AntdTextArea, type TextAreaProps as AntdTextAreaProps} from "antd/es/input/TextArea";
import {textAreaLabelStyles, textAreaStyles} from "./css/inputStyles.ts";

export interface TextAreaProps extends AntdTextAreaProps {
    label?: string;
}

export const TextArea = ({label, ...props}: TextAreaProps) => {
    return (
        <div style={{position: "relative"}}>
            <label htmlFor="textArea" style={textAreaLabelStyles}>{label}</label>
            <AntdTextArea {...props} styles={textAreaStyles} />
        </div>
    )
}