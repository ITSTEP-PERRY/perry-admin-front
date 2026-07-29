import type {IconType} from "../../types/IconType.ts";

export const DoubleRightIcon = ({style, color="black", size=40, fillColor="none", width=1.5}: IconType) => {
    return (
        <svg style={style} width={size} height={size} viewBox="0 0 40 40" fill={fillColor} xmlns="http://www.w3.org/2000/svg">
            <path d="M7.07031 4.43994L20.3603 18.2999C21.2103 19.1799 21.2103 20.5799 20.3603 21.4599L7.07031 35.2799" stroke={color} stroke-width={width} stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M19 4.70996L32.29 18.57C33.14 19.45 33.14 20.85 32.29 21.73L19 35.55" stroke={color} stroke-width={width} stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

    )
}