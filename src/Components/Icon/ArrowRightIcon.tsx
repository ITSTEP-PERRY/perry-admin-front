import type {IconType} from "../../types/IconType.ts";

export const ArrowRightIcon = ({style, color="black", size=40, fillColor="none", width=1.5}: IconType) => {
    return (
        <svg style={style} width={size} height={size} viewBox="0 0 40 40" fill={fillColor} xmlns="http://www.w3.org/2000/svg">
            <path d="M13.96 4.7998L27.25 18.6598C28.1 19.5398 28.1 20.9398 27.25 21.8198L13.96 35.6398" stroke={color} stroke-width={width} stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}