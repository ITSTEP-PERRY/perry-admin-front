import {PerryIcon} from "../Icon/PerryIcon.tsx";
import {perryButtonStyle} from "./css/perryButtonStyles.ts";

export const PerryButton = () => {
    return (
        <button style={perryButtonStyle}>
            <PerryIcon />
        </button>
    )
}