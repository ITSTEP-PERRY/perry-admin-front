import {PerryIcon} from "../Icon/PerryIcon.tsx";
import {perryButtonStyle} from "./css/perryButtonStyles.ts";
import {useNavigate} from "react-router";

export const PerryButton = () => {
    const navigate = useNavigate();
    return (
        <button style={perryButtonStyle} onClick={() => navigate("/")}>
            <PerryIcon />
        </button>
    )
}