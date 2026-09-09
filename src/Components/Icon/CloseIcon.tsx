import type {IconType} from "../../types/IconType.ts";

export const CloseIcon = ({color="black", size=40, width=1.5, fillColor="none"}: IconType) => {
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill={fillColor} xmlns="http://www.w3.org/2000/svg">
            <path d="M34.94 5L21.5 18.43" stroke={color} stroke-width={width} stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M34.94 34.8699L21.5 21.4399" stroke={color} stroke-width={width} stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5.05957 5L17.4996 17.44C18.8796 18.82 18.8796 21.06 17.4996 22.44L5.05957 34.88" stroke={color} stroke-width={width} stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}