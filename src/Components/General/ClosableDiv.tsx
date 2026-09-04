import type {ComponentProps} from "react";
import {useOutsideClick} from "../../shared/Hooks/useOutsideClick.ts";

export interface ClosableDivProps extends ComponentProps<"div">{
    onClose?: (open: boolean) => void;
}

export const ClosableDiv = (props: ClosableDivProps) => {
    const ref = useOutsideClick(() => props.onClose?.(false));
    return (
        <div ref={ref} {...props}>
            {props.children}
        </div>
    )
}