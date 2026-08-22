export type IconProps = {
    icon: string;
    size?: number | string;
    color?: string;
    width?: number | string;
    height?: number | string;
    lineWidth?: number | string;
    fillColor?: string;
}

export const Icon = (props: IconProps) => {

    return (
        <img src={props.icon} alt={props.icon} style={{
            width:  props.width ?? props.size,
            height: props.height ?? props.size,
        }} />
    )
}