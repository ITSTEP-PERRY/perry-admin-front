import type {IconType} from "../../types/IconType.ts";

export const TickIcon = ({color="black", size=1, width=1.5}: IconType) => {
    return (
        <svg width={8 + Number(size)} height={5 + Number(size)} viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.75 4.75C0.75 4.75 2.66114 6.55596 3.00515 6.67728C3.34916 6.79861 3.75448 6.76575 4.0542 6.5964C4.35393 6.42706 9.75 0.75 9.75 0.75" stroke={color} stroke-width={width} stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

    )
}