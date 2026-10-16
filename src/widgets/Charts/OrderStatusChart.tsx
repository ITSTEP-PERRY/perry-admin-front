
import {OrderStatus, OrderStatusColors} from "../../types/OrderType.ts";
import {Col, Flex, Row, Statistic, Tooltip} from "antd";
import Text from "antd/es/typography/Text";
import {text2Bold, text3} from "../../theme/textStyles.ts";
import Title from "antd/es/typography/Title";
import {header1} from "../../theme/headerStyles.ts";
import type {ComponentProps} from "react";
import {orderStatusChartStyle} from "./css/orderStatusChartStyle.ts";
import {ArrowUpIcon} from "../../Components/Icon/ArrowUpIcon.tsx";
import {colors} from "../../theme/colors.ts";
import {ArrowDownIcon} from "../../Components/Icon/ArrowDownIcon.tsx";


export interface OrderStatusChartProps extends ComponentProps<typeof Flex> {
    total?: number;
    totalAmount?: number;
    data?: Record<keyof typeof OrderStatus, number>;
    totalCompareAmount?: number;
    totalCompareOrder?: number;
}


export const OrderStatusChart = ({total, data, ...props}: OrderStatusChartProps) => {
    return (
       <Flex vertical {...props} style={{...props.style}}>
           <Text style={text2Bold}>Order Overview</Text>
           <Row>
               <Col span={10} style={orderStatusChartStyle.total}>
                   <Flex gap={10} align={"end"}>
                       <Flex vertical>
                           <Text style={text3}>Total Order</Text>
                           <Title style={header1}>{total ?? "NaN"}</Title>
                       </Flex>
                       {props.totalCompareOrder && <Statistic
                           value={props.totalCompareOrder}
                           precision={2}
                           styles={{content: {color: props.totalCompareOrder && props.totalCompareOrder >= 0 ? colors.primary : colors.destructive}}}
                           prefix={props.totalCompareOrder && props.totalCompareOrder >= 0
                               ? <ArrowUpIcon size={18} width={4}
                                              color={props.totalCompareOrder && props.totalCompareOrder >= 0 ? colors.primary : colors.destructive}/>
                               : <ArrowDownIcon size={18} width={4}
                                                color={props.totalCompareOrder && props.totalCompareOrder >= 0 ? colors.primary : colors.destructive}/>}
                           suffix="%"
                       />}
                   </Flex>
               </Col>
                <Col span={14} style={orderStatusChartStyle.total}>
                    <Flex gap={10} align={"end"}>
                        <Flex vertical>
                            <Text style={text3}>Total Amount</Text>
                            <Title style={header1}>{props.totalAmount ? `$ ${props.totalAmount}` : "NaN"}</Title>
                        </Flex>
                        {props.totalCompareAmount && <Statistic
                            value={props.totalCompareAmount}
                            precision={2}
                            styles={{content: {color: props.totalCompareAmount && props.totalCompareAmount >= 0 ? colors.primary : colors.destructive}}}
                            prefix={props.totalCompareAmount && props.totalCompareAmount >= 0
                                ? <ArrowUpIcon size={18} width={4}
                                               color={props.totalCompareAmount && props.totalCompareAmount >= 0 ? colors.primary : colors.destructive}/>
                                : <ArrowDownIcon size={18} width={4}
                                                 color={props.totalCompareAmount && props.totalCompareAmount >= 0 ? colors.primary : colors.destructive}/>}
                            suffix="%"
                        />}
                    </Flex>
                </Col>
           </Row>
           <Flex justify="space-between">
               {data && Object.entries(data).map(([key, v], index) => (
                   <Flex key={index} align={"center"} gap={10}
                         style={{...orderStatusChartStyle.values, borderColor: OrderStatusColors[key as keyof typeof OrderStatus]}}>
                       <Text style={text3}>{OrderStatus[key as keyof typeof OrderStatus]}</Text>
                       <Text style={text2Bold}>{v}</Text>
                   </Flex>
               ))}
           </Flex>
           <Flex gap={3}>
               {data && Object.entries(data).map(([k,v],index) => {
                   const percent = v && total ? (v / total) * 100 : 0
                   const key = k as keyof typeof OrderStatus
                   const color = OrderStatusColors[key]
                   return(
                       <Tooltip  key={index}
                                 title={`${OrderStatus[key]}: ${v}`}
                                 color={color}
                                 placement={"bottom"}
                       >
                        <div style={{width: `${percent}%`, backgroundColor: color, height: "30px"}}></div>
                       </Tooltip>
                   )
               })}
           </Flex>
       </Flex>
    );
};

