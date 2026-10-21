import {type ComponentProps, useState} from "react";
import { Flex, Modal, Space, Statistic} from "antd";
import Text from "antd/es/typography/Text";
import {text1, text3} from "../../../theme/textStyles.ts";
import {ArrowDownIcon} from "../../../Components/Icon/ArrowDownIcon.tsx";
import {Button} from "../../../Components/Buttons/Button.tsx";
import {BiCollapseAlt, BiExpandAlt} from "react-icons/bi";
import {
    Legend,

    Pie,
    PieChart, type PieSectorDataItem, type PieSectorShapeProps,
    Sector,
    useActiveTooltipDataPoints, useIsTooltipActive,
} from "recharts";
import {useAllOrdersQuery} from "../../../api/slices/ordersApiSlice.ts";
import {orderStatusChartStyles} from "./css/orderStatusChartStyles.ts";
import {type OrderFilterType, OrderStatus, OrderStatusColors} from "../../../types/OrderType.ts";
import {colors} from "../../../theme/colors.ts";
import {FaRegCircle} from "react-icons/fa";
import {FaRegCircleDot} from "react-icons/fa6";
import {useNavigate} from "react-router";
import {useFilters} from "../../../shared/Hooks/useFilters.tsx";
import {ArrowUpIcon} from "../../../Components/Icon/ArrowUpIcon.tsx";
import {CustomSpin} from "../../../Components/Utils/CustomSpin.tsx";

export interface OrderStatusChartProps extends ComponentProps<"div"> {
    onExpand?: () => void;
    expanded?: boolean;
    chartHeight?: number | string;
}

interface RenderActiveShapeProps extends PieSectorDataItem {
    expanded?: boolean;
}
const RADIAN = Math.PI / 180;

const RenderLabel = ({cx,
    cy,
    midAngle,
    outerRadius,
    fill,
    percent,
    value,
    name
}: RenderActiveShapeProps) => {

    const sin = Math.sin(-RADIAN * (midAngle ?? 1));
    const cos = Math.cos(-RADIAN * (midAngle ?? 1));
    const sx = (cx ?? 0) + ((outerRadius ?? 0) + 10) * cos;
    const sy = (cy ?? 0) + ((outerRadius ?? 0) + 10) * sin;
    const mx = (cx ?? 0) + ((outerRadius ?? 0) + 30) * cos;
    const my = (cy ?? 0) + ((outerRadius ?? 0) + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    if(!percent) return  null
    return <g>
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${name}: ${value}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
            {`(Rate ${((percent ?? 1) * 100).toFixed(2)}%)`}
        </text>
    </g>
}

const RenderActiveShape = ({
                               ...props
                           }: RenderActiveShapeProps) => {
    const name = props.payload.name  as keyof typeof OrderStatus

    return (
        <g>
            <text x={props.cx} y={props.cy - 10} dy={8} textAnchor="middle" fontSize={text3.fontSize} fill={colors.darkText}>
                {OrderStatus[name]}
            </text>
            <text x={props.cx} y={props.cy + 20} textAnchor={"middle"} fontSize={text3.fontSize} fill={colors.darkText}>{`Count: ${props.value}`}</text>
            <Sector
                cx={props.cx}
                cy={props.cy}
                innerRadius={props.innerRadius - 2}
                outerRadius={props.outerRadius + 2}
                startAngle={props.startAngle}
                endAngle={props.endAngle}
                fill={OrderStatusColors[name]}
                cornerRadius={4}
            />
            <Sector
                cx={props.cx}
                cy={props.cy}
                startAngle={props.startAngle}
                endAngle={props.endAngle}
                innerRadius={(props.outerRadius ?? 0) + 6}
                outerRadius={(props.outerRadius ?? 0) + 10}
                fill={OrderStatusColors[name]}
                cornerRadius={4}

            />
            {props.expanded && <>
                <RenderLabel {...props}
                    />
            </>
            }
        </g>
    );
};

export const OrderStatusPieChart = ({onExpand,expanded,chartHeight,style, ...props}: OrderStatusChartProps) => {
    const [open, setOpen] = useState(expanded ?? false)
    const {filters} = useFilters<OrderFilterType>()
    const {data, isFetching} = useAllOrdersQuery({
        pageSize: 1,
        fromUtc: filters.dateRange?.[1].toISOString(),
        toUtc: filters.dateRange?.[0].toISOString(),
    })
    const navigate = useNavigate()
    const [currentSector, setCurrentSector] = useState<string | undefined>();


    const chartData = data?.statusCounts ? Object.entries(data.statusCounts).map(i => ({
        name: i[0],
        value: i[1],
    })) : undefined
    const navigateToOrder = () => navigate(`/orders/${currentSector}`);

    const outerRadius = "80%"

    const MyCustomPie = (props: PieSectorShapeProps) => {
        const p = useActiveTooltipDataPoints();
        const isAnyPieActive = useIsTooltipActive();
        const isThisPieActive = isAnyPieActive && props.payload === p?.[0];
        let fillOpacity: number;


        if (isAnyPieActive && !isThisPieActive || currentSector && currentSector !== props.name) {
            fillOpacity = 0.5;
        } else {
            fillOpacity = 1;
        }
        const name = props.name  as keyof typeof OrderStatus

        return (
            <g onMouseOver={() => setCurrentSector(props.name)}
               onMouseOut={() => setCurrentSector(undefined)}
                onClick={() => navigateToOrder()}
               style={{cursor: "pointer"}}
            >
                {props.isActive || props.name === currentSector ?
                    <RenderActiveShape {...props} expanded={open}/>
                    :
                    <Sector
                        {...props}
                        fill={OrderStatusColors[name]}
                        stroke="none"
                        fillOpacity={fillOpacity}
                        style={{transition: 'fill-opacity 0.3s ease'}}
                    />}

                {expanded && <>
                    <RenderLabel {...props}
                    />
                </>
                }
            </g>
        );
    };

    return (
        <div style={{...orderStatusChartStyles.root, ...style, height: style?.height}} {...props}>
            <Flex justify={"space-between"} align={"center"} style={{marginBottom: 10}}>
                <Text style={text1}>Order</Text>
                <Space size={"large"}>
                    <Space>
                        <Text style={text1}>Total: {data?.totalOrders}</Text>
                        {data?.totalOrderCompare && <Statistic
                            value={data?.totalOrderCompare}
                            precision={2}
                            styles={{content: {fontSize: 18,color: data?.totalOrderCompare && data?.totalOrderCompare >= 0 ? colors.primary : colors.destructive}}}
                            prefix={data?.totalOrderCompare && data?.totalOrderCompare >= 0
                                ? <ArrowUpIcon size={18} width={4}
                                               color={data?.totalOrderCompare && data?.totalOrderCompare >= 0 ? colors.primary : colors.destructive}/>
                                : <ArrowDownIcon size={18} width={4}
                                                 color={data?.totalOrderCompare && data?.totalOrderCompare >= 0 ? colors.primary : colors.destructive}/>}
                            suffix="%"
                        />}
                    </Space>
                    <Button type={"text"} style={{padding: 4}} onClick={() => {
                        setOpen(!open)
                        onExpand?.()
                    }}>
                        {open ? <BiCollapseAlt /> : <BiExpandAlt/>}
                    </Button>
                </Space>

            </Flex>

            {isFetching ?
                <CustomSpin />
                :
                <>
                <PieChart style={{width: '100%', height: chartHeight, aspectRatio: 1}} responsive>
                <Pie
                    data={chartData}
                    innerRadius="50%"
                    outerRadius={outerRadius}
                    dataKey="value"
                    shape={MyCustomPie}
                    cornerRadius={4}
                    paddingAngle={4}
                    // isAnimationActive
                    cx="40%"
                    cy="50%"
                    labelLine={false}
                    label={(props) => {
                        const {cx, cy, midAngle, outerRadius, percent} = props;

                        if (!percent || expanded) return null;

                        const radius = (outerRadius ?? 0) + 7;

                        const sx = (cx ?? 0) + radius * Math.cos(-midAngle! * RADIAN);
                        const sy = (cy ?? 0) + radius * Math.sin(-midAngle! * RADIAN);

                        const textAnchor = sx > (cx ?? 0) ? 'start' : 'end';

                        return (
                            <text
                                x={sx}
                                y={sy}
                                fill={colors.darkText} // Использовано fill вместо color
                                textAnchor={textAnchor} // Текст не будет налезать на пирог
                                dominantBaseline="central"
                                fontSize="14px"
                            >
                                {`${Math.round(percent * 100)}%`}
                            </text>
                        );
                    }}

                />
                <Legend

                    itemSorter={null}
                    formatter={(value, entry) => {
                        const payload = entry.payload as {name: string, value: number}
                       return (<div onMouseOver={() => setCurrentSector(value)} style={{
                            color: value === currentSector ? colors.darkText : colors.inputBorder,
                            cursor: "pointer"
                        }}
                             onMouseOut={() => setCurrentSector(undefined)}
                             onClick={() => navigateToOrder()}

                        >
                            <Space align={"start"}>
                                <div style={{color: OrderStatusColors[value as keyof typeof OrderStatus]}}>
                                    {value === currentSector ? <FaRegCircleDot/> : <FaRegCircle/>}
                                </div>
                                <text fontSize={40}>{value}: {payload.value}</text>
                            </Space>
                        </div>)
                    }
                    }
                    position={"right"}
                    iconType={"none"}
                    inactiveColor={"#222"}
                />
                {/*<Tooltip />*/}
            </PieChart>

            {!expanded && <Modal
                width={"55%"}
                open={open} onCancel={() => setOpen(false)}
                footer={null}
                closable={false}
                styles={{container: {padding: '0'}}}
            >
                <OrderStatusPieChart style={{width:'100%'}} expanded={open} chartHeight={"50vh"} onExpand={() => setOpen(false)} />
                {/*<Divider />*/}
            </Modal>}
                </>
            }
        </div>
    );
}