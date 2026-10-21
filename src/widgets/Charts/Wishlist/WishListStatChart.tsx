import {XAxis, YAxis, Tooltip, AreaChart, Area, Bar, Legend, CartesianGrid} from 'recharts';
import {useGetWishlistStatQuery} from "../../../api/slices/wishlistApiSlice.ts";
import {text1, text3} from "../../../theme/textStyles.ts";
import {colors} from "../../../theme/colors.ts";
import {wishlistDatePicker, wishlistStatChartStyles} from "./css/wishlistStatChartStyles.ts";
import {type ComponentProps, useState} from "react";
import Text from "antd/es/typography/Text";
import {DatePicker, Flex, Radio, Space} from "antd";
import {ArrowDownIcon} from "../../../Components/Icon/ArrowDownIcon.tsx";
import type {CheckboxGroupProps} from "antd/es/checkbox";
import {BiCollapseAlt, BiExpandAlt} from "react-icons/bi";
import {Button} from "../../../Components/Buttons/Button.tsx";
import {CustomSpin} from "../../../Components/Utils/CustomSpin.tsx";

const chartOptions: CheckboxGroupProps<string>['options'] = [
    {
        label: "Area",
        value: "area",
    },
    {
        label: "Bar",
        value: "bar",
    }
]
export interface WishlistStatChart extends ComponentProps<"div"> {
    onExpand?: () => void;
    expanded?: boolean;
    chartHeight?: number | string;
}

export const WishlistStatChart = ({onExpand,chartHeight, expanded,style, ...props}: WishlistStatChart) => {
    const currentYear = new Date().getFullYear().toString()
    const [year, setYear] = useState<string>(currentYear);
    const {data, isFetching} = useGetWishlistStatQuery(year)

    const [chartType , setChartType] = useState("area")

    return (
        <div style={{...wishlistStatChartStyles.root, ...style, height: style?.height}} {...props}>
            <Flex justify={"space-between"} align={"start"} style={{marginBottom: 10}}>
                <Text style={text1}>Wishlist</Text>
                <Space >
                    {expanded && <DatePicker
                        picker={"year"}
                        suffixIcon={<ArrowDownIcon size={16} width={3}/>}
                        styles={wishlistDatePicker}
                        onChange={(_, year) => {
                            if (year) setYear(year)
                        }}
                    />}
                    <Radio.Group
                        value={chartType}
                        options={chartOptions}
                        optionType="button"
                        onChange={v => setChartType(v.target.value)}
                    />
                    <Button type={"text"} style={{padding: 12}} onClick={onExpand}>
                        {expanded ? <BiCollapseAlt /> : <BiExpandAlt/>}
                    </Button>
                </Space>
            </Flex>
            {isFetching ?
                <CustomSpin />
                :
                <AreaChart
                style={{maxWidth: '100%', height: chartHeight ?? "20vh", ...text3}}
                responsive
                data={data?.byMonth}
                margin={{
                    top: 0,
                    right: 0,
                    left: -30,
                    bottom: 0,
                }}
            >
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={colors.secondary} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={colors.lightBlue} stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="monthName"
                       tickFormatter={(monthName) => expanded ? monthName : monthName[0]}
                       tickLine={false}
                />
                {expanded && <YAxis
                    tickLine={false}
                    style={{marginRight: 50}}
                    dataKey="count"
                    niceTicks="snap125"
                    tickCount={6}
                />}
                {expanded && <CartesianGrid strokeDasharray="3 3"/>}
                <Tooltip contentStyle={{borderRadius: 4, borderColor: colors.inputBorder}}/>
                {
                    chartType === "area" &&
                    <Area type="monotone"
                          dataKey="count"
                          name={"Wish"}
                          stroke={colors.secondary}
                          fillOpacity={1}
                          fill="url(#colorUv)"
                          isAnimationActive={true}
                          animationBegin={200}
                          animationDuration={1000}
                    />
                }
                {
                    chartType === "bar" &&
                    <Bar type="monotone"
                         dataKey="count"
                         name={"Wish"}
                         fillOpacity={1}
                         radius={[10, 10, 0, 0]}
                         fill={colors.secondary}
                         isAnimationActive={true}
                         animationBegin={200}
                         animationDuration={1000}
                    />
                }
                {expanded && <Legend formatter={() => <Text style={text1}>Total wish: {data?.total}</Text>}/>}
            </AreaChart>
            }

        </div>
    );
}