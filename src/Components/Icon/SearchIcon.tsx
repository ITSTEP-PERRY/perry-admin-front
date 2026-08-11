import type {IconType} from "../../types/IconType.ts";

export const SearchIcon = ({color="black", size=40, fillColor="none", width=1.5}: IconType) => {
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill={fillColor} xmlns="http://www.w3.org/2000/svg">
            <path d="M23.31 23.51C21.51 25.87 17.36 27 15.5 27C9.7 27 5 22.3 5 16.5C5 10.7 9.7 6 15.5 6C21.3 6 26 10.7 26 16.5C26 17.64 25.82 18.74 25.48 19.77" stroke={color} stroke-width={width} stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M34.9996 33.9998L23.3096 23.5098" stroke={color} stroke-width={width} stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}