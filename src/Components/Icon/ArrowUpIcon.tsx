import type {IconType} from "../../types/IconType.ts";

export const ArrowUpIcon = ({style,color="black", size=40, fillColor="none", width=1.5}: IconType) => {
    return (
        <svg style={style} width={size} height={size} viewBox="0 0 40 40" fill={fillColor} xmlns="http://www.w3.org/2000/svg">
            <path d="M35.4201 26.45L21.5601 13.16C20.6801 12.31 19.2801 12.31 18.4001 13.16L4.58008 26.45" stroke={color} stroke-width={width} stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

    )
}