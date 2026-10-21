import {Avatar, Col, Divider, Drawer, type DrawerProps, Flex, Image, message, Row, Space, Spin, Tag} from "antd";
import Title from "antd/es/typography/Title";
import {text1,text2, text2Bold, text3} from "../../theme/textStyles.ts";
import {colors} from "../../theme/colors.ts";
import {dateTimeFormatter} from "../../shared/formatter.ts";
import {OrderStatus, OrderStatusColors, type OrderStatusType, type OrderType} from "../../types/OrderType.ts";
import {header3} from "../../theme/headerStyles.ts";
import {useGetUserByIdQuery} from "../../api/slices/userApiSlice.ts";
import Text from "antd/es/typography/Text";
import {orderDetailsDrawerStyles} from "./css/orderDetailsDrawerStyles.ts";
import {Select} from "../../Components/Select/Select.tsx";
import {useSetOrderStatusMutation} from "../../api/slices/ordersApiSlice.ts";
import {useState} from "react";

export interface OrderDetailsDrawerProps extends DrawerProps {
    order: OrderType
}

const OrderStatusComp= ({order}: { order: OrderType }) => {
    const [setOrderStatus, {isLoading}] = useSetOrderStatusMutation()
    const [status, setStatus] = useState<keyof OrderStatusType>(order.status as keyof OrderStatusType)
    const options = Object.entries(OrderStatus).map(([key, value]) => ({
        value: key,
        label: value,
    }))

    const handleStatusChange = async (id: string, status: keyof OrderStatusType) => {
        try {
            await setOrderStatus({id, status}).unwrap()
            setStatus(status as keyof OrderStatusType)
            message.success(`Order ${order.orderNumber} changed status to ${status.toString()}`)
        }catch {
            message.error(`Failed to change status to ${status.toString()}`)
        }
    }
    console.log(status)
    return <Select
        style={{width: '100%'}}
        options={options}
        value={status}
        // defaultValue={order.status}
        onChange={(v) => handleStatusChange(order.id, v)}
        labelRender={(v) =>
            <>
                {isLoading ?
                    <Spin />
                    :
                    <Tag color={OrderStatusColors[v.value as keyof typeof OrderStatus]} style={{fontSize: 14, padding: 5}}>
                    {OrderStatus[v.value as keyof typeof OrderStatus]}
                </Tag>
                }
            </>
        }/>
}

export const OrderDetailsDrawer = ({order,...props}: OrderDetailsDrawerProps) => {
    const {data: user} = useGetUserByIdQuery(order.userId)
    return (
        <Drawer
                size={600}
                closable={false}


                {...props}
        >
            <Flex vertical>
                <Space vertical>
                    <Title style={header3}>{order.orderNumber}</Title>
                    <Title style={text2}>Order Details</Title>
                </Space>
                <Divider />
                <Flex vertical gap={10}>
                <Text style={text1}>Items</Text>
                {order.items.map((item, index) => (
                    <Row key={index} style={orderDetailsDrawerStyles.itemsRow}>
                        <Col span={10}>
                            <Space align={"start"} style={orderDetailsDrawerStyles.product}>
                                <Image src={item.imageUrl} style={orderDetailsDrawerStyles.itemImage}/>
                                <Text style={text3}>{item.productName}</Text>
                            </Space>
                        </Col>
                        <Col span={7} style={orderDetailsDrawerStyles.itemsCount}>
                            <Text style={text3}>{item.quantity}psc</Text>
                        </Col>
                        <Col span={7} style={orderDetailsDrawerStyles.numbers}>
                                <Space>
                                    <Text style={text2Bold}>$ {item.lineTotal}</Text>
                                    <Text style={{...text3, color: colors.inputBorder}}>{item.quantity} x ${item.unitPrice}</Text>
                                </Space>
                        </Col>
                    </Row>
                ))}
                </Flex>
                <Divider />
                <Flex vertical gap={10}>
                    <Row>
                        <Col span={10}>
                            <Text style={text2}>Created At</Text>
                        </Col>
                        <Col span={12}>
                            <Text style={text2Bold}>{dateTimeFormatter.format(new Date(order.orderDateUtc))}</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={10}>
                            <Text style={text2}>Last Update At</Text>
                        </Col>
                        <Col span={12}>
                            <Text style={text2Bold}>{dateTimeFormatter.format(new Date(order.orderDateUtc))}</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={10}>
                            <Text style={text2}>Shipping Address</Text>
                        </Col>
                        <Col span={12}>
                            <Text style={text2Bold}>{order.shippingAddress}</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={10}>
                            <Text style={text2}>Payment method</Text>
                        </Col>
                        <Col span={12}>
                            <Text style={text2Bold}>{order.paymentType}</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={10}>
                            <Text style={text2}>Status</Text>
                        </Col>
                        <Col span={12}>
                            <OrderStatusComp order={order} />
                        </Col>
                    </Row>
                </Flex>
                <Divider />
                <Flex vertical gap={10}>
                    <Row>
                        <Col span={10}>
                            <Text style={text2}>Customer Name</Text>
                        </Col>
                        <Col span={12}>
                            <Space>
                                <Avatar src={user?.avatarUrl} />
                                <Text style={text2}>{order.userName}</Text>
                            </Space>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={10}>
                            <Text style={text2}>Email</Text>
                        </Col>
                        <Col span={12}>
                            <a style={orderDetailsDrawerStyles.email}>{user?.email}</a>
                        </Col>
                    </Row>

                </Flex>
                <Divider />
                <Flex vertical gap={10}>
                    <Text style={text1}>Payment</Text>
                    <Row>
                        <Col span={10}>
                            <Text style={text2}>Subtotal</Text>
                        </Col>
                        <Col span={12}>
                            <a style={text2Bold}>${order.totalAmount}</a>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={10}>
                            <Text style={text2}>Shipping fee</Text>
                        </Col>
                        <Col span={12}>
                            <a style={text2Bold}>$0.00</a>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={10}>
                            <Text style={text2}>Total</Text>
                        </Col>
                        <Col span={12}>
                            <a style={text2Bold}>${order.totalAmount}</a>
                        </Col>
                    </Row>
                </Flex>
            </Flex>

        </Drawer>
    )
}