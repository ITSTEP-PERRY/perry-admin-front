import type {IconType} from "../../types/IconType.ts";

export const ArrowsUpDownIcon = ({style,color="black", size=40, fillColor="none", width=1.5}: IconType) => {
    return (
        <svg style={style} width={size} height={size} viewBox="0 0 40 40" fill={fillColor} xmlns="http://www.w3.org/2000/svg">
            <path d="M28.5197 27.2998L20.8597 34.6498C20.3697 35.1198 19.5997 35.1198 19.1097 34.6498L11.4697 27.3098" stroke={color} stroke-width={width} stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M28.5197 12.7001L20.8597 5.35006C20.3697 4.88006 19.5997 4.88006 19.1097 5.35006L11.4697 12.6901" stroke={color} stroke-width={width} stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}