import {Button, type ButtonProps} from "./Button.tsx";
import {PlusIcon} from "../Icon/PlusIcon.tsx";
import {colors} from "../../theme/colors.ts";

export const AddButton = ({style, children,...props}: Omit<ButtonProps, "type">) => {
    return (
        <Button type={"secondary"} {...props} style={{
            padding: "20px",
            justifyContent: "start",
            alignItems: "center",
            width: "100%",
            ...style,
        }}>
            <PlusIcon color={colors.secondary} size={24} />
            {children}
        </Button>
    )
}