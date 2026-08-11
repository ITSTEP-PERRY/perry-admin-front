import type {IconType} from "../../types/IconType.ts";

export const ArrowDownIcon = ({style,color="black", size=40, fillColor="none", width=1.5}: IconType) => {
    return (
        <svg style={style} width={size} height={size} viewBox="0 0 40 40" fill={fillColor} xmlns="http://www.w3.org/2000/svg">
            <path d="M35.4201 14.5303L21.5601 27.8203C20.6801 28.6703 19.2801 28.6703 18.4001 27.8203L4.58008 14.5303" stroke={color} stroke-width={width} stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}