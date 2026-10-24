import {XAxis, YAxis, Tooltip, AreaChart, Area, Bar,CartesianGrid} from 'recharts';
import {text1, text3} from "../../../theme/textStyles.ts";
import {colors} from "../../../theme/colors.ts";
import {type ComponentProps, useState} from "react";
import Text from "antd/es/typography/Text";
import {Flex, Modal, Radio, Space} from "antd";
import type {CheckboxGroupProps} from "antd/es/checkbox";
import {BiCollapseAlt, BiExpandAlt} from "react-icons/bi";
import {Button} from "../../../Components/Buttons/Button.tsx";
import {CustomSpin} from "../../../Components/Utils/CustomSpin.tsx";
import {useGetStatisticChartQuery} from "../../../api/slices/statisticApiSlice.ts";
import {orderAmountChartStyles} from "./css/orderAmountChartStyles.ts";
import type { OrderStatCartParams} from "../../../types/dto/OrderDto.ts";

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

const periodOptions: CheckboxGroupProps<string>['options'] = [
    {
        label: "Last 12 month",
        value: "month",
    },
    {
        label: "Last 30 days",
        value: "day",
    },
    {
        label: "All",
        value: "year",
    },
]

export interface OrderAmountChartProps extends ComponentProps<"div"> {
    onExpand?: () => void;
    expanded?: boolean;
    chartHeight?: number | string;
}

export const OrderAmountChart = ({expanded,onExpand, chartHeight, style, ...props}: OrderAmountChartProps) => {
    const [open, setOpen] = useState(expanded ?? false);
    const [period, setPeriod] = useState<OrderStatCartParams["period"]>("month");
    const {data, isFetching} = useGetStatisticChartQuery({
        period: period
    })

    const [chartType , setChartType] = useState("area")

    return (
        <div style={{ ...orderAmountChartStyles.root,...style, height: style?.height}} {...props}>
            <Flex justify={"space-between"} align={"start"} style={{marginBottom: 10}}>
                <Text style={text1}>Amount</Text>
                <Space >
                    {open && <Radio.Group
                        value={period}
                        options={periodOptions}
                        optionType="button"
                        onChange={v => setPeriod(v.target.value)}
                    />}
                    <Radio.Group
                        value={chartType}
                        options={chartOptions}
                        optionType="button"
                        onChange={v => setChartType(v.target.value)}
                    />
                    <Button type={"text"} style={{padding: 12}} onClick={() => {
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
                <AreaChart
                    style={{maxWidth: '100%', height: chartHeight ?? "20vh", ...text3}}
                    responsive
                    data={data?.points}
                    margin={{
                        top: 0,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={colors.secondary} stopOpacity={0.8}/>
                            <stop offset="95%" stopColor={colors.lightBlue} stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="label"
                           // tickFormatter={(monthName) => expanded ? monthName : monthName[0]}
                           tickLine={false}
                    />
                    {open && <YAxis
                        tickLine={false}
                        style={{marginRight: 50}}
                        dataKey="amount"
                        niceTicks="snap125"
                        tickCount={6}
                    />}
                    {open && <CartesianGrid strokeDasharray="3 3"/>}
                    <Tooltip contentStyle={{borderRadius: 4, borderColor: colors.inputBorder}}/>
                    {
                        chartType === "area" &&
                        <>
                        <Area type="monotone"
                              dataKey="amount"
                              name={"Amount"}
                              stroke={colors.secondary}
                              fillOpacity={1}
                              fill="url(#colorUv)"
                              isAnimationActive={true}
                              animationBegin={200}
                              animationDuration={1000}
                        />
                            <Area type="monotone"
                                  dataKey="ordersCount"
                                  name={"Orders"}
                                  stroke={colors.primary}
                                  fillOpacity={1}
                                  fill="url(#colorUv)"
                                  isAnimationActive={true}
                                  animationBegin={200}
                                  animationDuration={1000}
                            />
                        </>
                    }
                    {
                        chartType === "bar" &&
                        <>
                        <Bar type="monotone"
                             dataKey="amount"
                             name={"Amount"}
                             fillOpacity={1}
                             radius={[10, 10, 0, 0]}
                             fill={colors.secondary}
                             isAnimationActive={true}
                             animationBegin={200}
                             animationDuration={1000}
                        />
                            <Bar type="monotone"
                                 dataKey="ordersCount"
                                 name={"Orders"}
                                 fillOpacity={1}
                                 radius={[10, 10, 0, 0]}
                                 fill={colors.primary}
                                 isAnimationActive={true}
                                 animationBegin={200}
                                 animationDuration={1000}
                            />
                        </>
                    }
                    {/*{open && <Legend formatter={() => <Text style={text1}>Total wish: </Text>}/>}*/}
                </AreaChart>
            }
            {!expanded &&  <Modal
                width={"55%"}
                open={open} onCancel={() => setOpen(false)}
                footer={null}
                closable={false}
                styles={{container: {padding: '0'}}}
            >
                <OrderAmountChart style={{width:'100%'}} expanded={open} chartHeight={"50vh"} onExpand={() => setOpen(false)} />
                {/*<Divider />*/}
            </Modal>}
        </div>
    );
}