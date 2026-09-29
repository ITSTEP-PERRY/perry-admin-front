import {Avatar, Col, Divider, Drawer, type DrawerProps, Flex, Image, Row, Space, Tag} from "antd";
import Title from "antd/es/typography/Title";
import {text1Bold, text2, text2Bold, text3, text3Bold} from "../../theme/textStyles.ts";
import {colors} from "../../theme/colors.ts";
import {dateFormatter, dateTimeFormatter} from "../../shared/formatter.ts";
import {OrderStatus, OrderStatusColors, type OrderType} from "../../types/OrderType.ts";
import {ordersPageStyles} from "../../pages/css/ordersPageStyles.ts";
import {header3} from "../../theme/headerStyles.ts";
import {useGetUserByIdQuery} from "../../api/slices/userApiSlice.ts";
import Text from "antd/es/typography/Text";
import {orderDetailsDrawerStyles} from "./css/orderDetailsDrawerStyles.ts";

export interface OrderDetailsDrawerProps extends DrawerProps {
    order: OrderType
}

const OrderStatusComp= ({order}: { order: OrderType }) => (
    <Tag color={OrderStatusColors[order?.status as keyof typeof OrderStatus]} style={ordersPageStyles.statusTag}>
        {OrderStatus[order?.status as keyof typeof OrderStatus]}
    </Tag>
)

export const OrderDetailsDrawer = ({order,...props}: OrderDetailsDrawerProps) => {
    const {data: user} = useGetUserByIdQuery(order.userId)
    return (
        <Drawer
                size={800}
                closable={false}
                title={<Title style={header3}>Order Details</Title>}
                {...props}
        >
            <Row gutter={12}>
                <Col span={12}>
                    <Flex vertical style={{width:'100%'}} gap={10}>
                        <Text style={text1Bold}>Order Details</Text>
                        <Flex justify={"space-between"}>
                            <Text style={text3}>Order ID</Text>
                            <Text style={text3Bold}>{order.id}</Text>
                        </Flex>
                        <Flex justify={"space-between"}>
                            <Text style={text3}>Status Order</Text>
                            <OrderStatusComp order={order} />
                        </Flex>
                        <Flex justify={"space-between"}>
                            <Text style={text3}>Order Date</Text>
                            <Text style={text3Bold}>{dateTimeFormatter.format(new Date(order.orderDateUtc))}</Text>
                        </Flex>
                        <Flex justify={"space-between"}>
                            <Text style={text3}>Last Update</Text>
                            <Text style={text3Bold}>{dateTimeFormatter.format(new Date(order.orderDateUtc))}</Text>
                        </Flex>
                        <Flex justify={"space-between"}>
                            <Text style={text3}>Total Amount</Text>
                            <Text style={text3Bold}>$ {order.totalAmount}</Text>
                        </Flex>
                        <Flex justify={"space-between"}>
                            <Text style={text3}>Order Channel</Text>
                            <Text style={text3Bold}>$ {order.paymentType}</Text>
                        </Flex>
                        <Divider />
                        {user &&
                            <Flex vertical gap={10}>
                                <Text style={text1Bold}>Customer Details</Text>
                                <Flex gap={10} align={"center"}>
                                        <Avatar src={""} size={"large"}/>
                                        <Flex vertical>
                                            <Text style={text2}>{user.firstName} {user.lastName}</Text>
                                            <Text style={text3}>Total: 2 order</Text>
                                        </Flex>
                                </Flex>
                                <Tag color={colors.secondary} style={{width: "fit-content"}}>{user.email}</Tag>
                            </Flex>
                        }
                    </Flex>
                </Col>
                <Col span={12}>
                    <Text style={header3}>Order Items</Text>
                    <Flex vertical gap={20}>
                    {order.items.map((item, index) => (
                        <Flex key={index} gap={10}>
                            <Image src={item.imageUrl} style={orderDetailsDrawerStyles.itemImage}/>
                            <Flex vertical justify={"space-between"} align={"end"}>
                                <Text style={text3}>{item.productName}</Text>
                                <Space>
                                    <Text style={text2Bold}>$ {item.lineTotal}</Text>
                                    <Text style={{...text3, color: colors.inputBorder}}>{item.quantity} x ${item.unitPrice}</Text>
                                </Space>
                            </Flex>
                        </Flex>
                    ))}
                    </Flex>
                </Col>
            </Row>
        </Drawer>
    )
}