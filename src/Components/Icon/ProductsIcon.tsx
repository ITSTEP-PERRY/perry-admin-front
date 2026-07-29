import type {IconType} from "../../types/IconType.ts";

export const ProductsIcon = ({style, color="black", size=40, fillColor="none", width=1.5}: IconType) => {
    return (
        <svg style={style} width={size} height={size} viewBox="0 0 32 32" fill={fillColor} xmlns="http://www.w3.org/2000/svg">
            <path d="M24.2086 12.6719H25.6086C27.1046 12.6719 28.2406 14.0319 27.9606 15.5039L25.8806 23.4079C25.6726 24.5439 24.6806 25.3679 23.5286 25.3679H8.47264C7.32064 25.3679 6.32864 24.5439 6.12064 23.4079L4.04064 15.5039C3.76864 14.0319 4.89663 12.6719 6.39263 12.6719H7.76064" stroke={color} stroke-width={width} stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 12.6719H19.968" stroke={color} stroke-width={width} stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9.67188 14.2166C9.67188 10.0326 12.5039 6.64062 15.9999 6.64062C19.4959 6.64062 22.3279 10.0326 22.3279 14.2166" stroke={color} stroke-width={width} stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}