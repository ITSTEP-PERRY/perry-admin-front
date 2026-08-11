import type {IconType} from "../../types/IconType.ts";

export const PlusIcon = ({style, color="black", size=40, fillColor="none", width=1.5}: IconType) => {
    return (
        <svg style={style} width={size} height={size} viewBox="0 0 40 40" fill={fillColor} xmlns="http://www.w3.org/2000/svg">
            <path d="M20 4.93994V17.4299" stroke={color} stroke-width={width} stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M34.9998 19.9399H22.5098" stroke={color} stroke-width={width} stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5 19.9399H17.49C18.88 19.9399 20 21.0599 20 22.4499V34.9399" stroke={color} stroke-width={width} stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}