import type {IconType} from "../../types/IconType.ts";

export const MinusIcon = ({color="black", size=40, fillColor="none", width=1.5}: IconType) => {
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill={fillColor} xmlns="http://www.w3.org/2000/svg">
            <path d="M5 19.9399H35" stroke={color} stroke-width={width} stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}