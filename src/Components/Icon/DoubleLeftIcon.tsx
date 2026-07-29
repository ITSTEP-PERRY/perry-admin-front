import type {IconType} from "../../types/IconType.ts";

export const DoubleLeftIcon = ({style, color="black", size=40, fillColor="none", width=1.5}: IconType) => {
    return (
        <svg style={style} width={size} height={size} viewBox="0 0 40 40" fill={fillColor} xmlns="http://www.w3.org/2000/svg">
            <path d="M32.9304 4.43994L19.6404 18.2999C18.7904 19.1799 18.7904 20.5799 19.6404 21.4599L32.9304 35.2799" stroke={color} stroke-width={width} stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M20.9998 4.70996L7.70977 18.57C6.85977 19.45 6.85977 20.85 7.70977 21.73L20.9998 35.55" stroke={color} stroke-width={width} stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}