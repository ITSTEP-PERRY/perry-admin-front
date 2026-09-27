import {Rate, type RateProps} from "antd";
import {StarFullIcon} from "../Icon/StarFullIcon.tsx";
import {StarHalfIcon} from "../Icon/StarHalfIcon.tsx";
import {StarEmptyIcon} from "../Icon/StarEmptyIcon.tsx";


export interface CustomRateProps extends Omit<RateProps, "size"> {
    size?: string | number;
}

export const CustomRate = ({size, ...props}: CustomRateProps) => (
    <Rate {...props}
          allowHalf
          character={({ index = 0, value = 0}) => {
                const starPosition = index + 1;
                if (value >= starPosition) {
                    return <StarFullIcon size={size}/>;
                }
                if (value + 0.5 === starPosition) {
                    return <StarHalfIcon size={size}/>;
                }
                return <StarEmptyIcon size={size} />;
            }}
    />
)