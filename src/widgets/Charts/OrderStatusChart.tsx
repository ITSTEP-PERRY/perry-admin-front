
import {OrderStatus, OrderStatusColors} from "../../types/OrderType.ts";
import {Flex, Tooltip} from "antd";
import Text from "antd/es/typography/Text";
import {text2Bold, text3, text3Bold} from "../../theme/textStyles.ts";
import Title from "antd/es/typography/Title";
import {header1} from "../../theme/headerStyles.ts";
import type {ComponentProps} from "react";
import {orderStatusChartStyle} from "./css/orderStatusChartStyle.ts";



export interface OrderStatusChartProps extends ComponentProps<typeof Flex> {
    total?: number;
    data?: Record<keyof typeof OrderStatus, number>;
    totalCompareAmount?: number;
    totalCompareOrder?: number;
}

export const OrderStatusChart = ({total, data, ...props}: OrderStatusChartProps) => {
    return (
       <Flex vertical {...props} style={{...orderStatusChartStyle.root, ...props.style}}>
           <Text style={text3Bold}>Order Overview</Text>
           <Flex>
               <Flex vertical gap={0} style={orderStatusChartStyle.total}>
                   <Text style={text3}>Total Order</Text>
                   <Title style={header1}>{total ?? "NaN"}</Title>
               </Flex>
                <Flex>
                </Flex>
           </Flex>
           <Flex justify="space-between">
               {data && Object.entries(data).map(([key, v], index) => (
                   <Flex key={index} align={"center"} gap={10}
                         style={{...orderStatusChartStyle.values, borderColor: OrderStatusColors[key as keyof typeof OrderStatus]}}>
                       <Text style={text3}>{key}</Text>
                       <Text style={text2Bold}>{v}</Text>
                   </Flex>
               ))}
           </Flex>
           <Flex gap={3}>
               {data && Object.entries(data).map(([k,v],index) => {
                   const percent = total && (total / 100) * v
                   const color = OrderStatusColors[k as keyof typeof OrderStatus]
                   return(
                       <Tooltip  key={index}
                                 title={`${k}: ${v}`}
                                 color={color}
                                 placement={"bottom"}
                       >
                        <div style={{width: percent, backgroundColor: color, height: "30px"}}></div>
                       </Tooltip>
                   )
               })}
           </Flex>
       </Flex>
    );
};

