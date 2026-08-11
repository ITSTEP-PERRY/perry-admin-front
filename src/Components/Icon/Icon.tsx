import {cloneElement, type ComponentProps, type ReactElement} from "react";

export type IconProps = {
    icon: ReactElement;
    size?: number | string;
    color?: string;
    lineWidth?: number | string;
    fillColor?: string;
}

export const Icon = (props: IconProps) => {
    const icon = cloneElement(props.icon as ReactElement<ComponentProps<"svg">>, {
        width: props.size,
        color: props.color,
    })
    return (
        <>
            {icon}
        </>
    )
}