import type {OrderStatusType} from "../../types/OrderType.ts";
import type {CSSProperties, ReactNode} from "react";
import {Flex, Space} from "antd";
import {orderStatusCardStyles} from "./css/orderStatusCardStyles.ts";
import Title from "antd/es/typography/Title";
import {header2, header3} from "../../theme/headerStyles.ts";
import {text2} from "../../theme/textStyles.ts";
import Text from "antd/es/typography/Text";

export type OrderStatusStatisticProps = {
    status: OrderStatusType,
    count: number,
    icon: ReactNode,
    style?: CSSProperties
}

export const OrderStatusCard = ({...props}: OrderStatusStatisticProps) => {
    return (
        <Flex style={{...orderStatusCardStyles.root, ...props.style}} align={"center"} gap={20}>
            {props.icon}
            <Flex vertical>
                <Title style={header3}>{props.status}</Title>
                <Space>
                    <Title style={header2}>{props.count}</Title>
                <Text style={text2}>order(s)</Text>
                </Space>
            </Flex>
        </Flex>
    )
}