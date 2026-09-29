import {
    Avatar, Col,
    DatePicker,
    Flex,
    message, Row,
    Space,
    Table,
    type TableProps,
    Tabs,
    type TabsProps,
    Tag,
    Tooltip
} from "antd";
import {BaseSearch} from "../Components/Search/BaseSearch.tsx";
import {orderPageTabsStyles, ordersPageStyles, ordersRangePickerStyles} from "./css/ordersPageStyles.ts";
import {
    OrderStatusColors,
    type OrderType,
    OrderStatus,
    type OrderFilterType,
    type OrderStatusType
} from "../types/OrderType.ts";
import Text from "antd/es/typography/Text";
import {text3} from "../theme/textStyles.ts";
import {antdPageTableStyles} from "../theme/antdTableStyles.ts";
import {dateFormatter} from "../shared/formatter.ts";
import {ArrowsUpDownIcon} from "../Components/Icon/ArrowsUpDownIcon.tsx";
import {ItemNotFound} from "../widgets/ItemNotFound.tsx";
import {useAntdTableRowSelect} from "../shared/Hooks/useAntdTableRowSelect.tsx";
import {Button} from "../Components/Buttons/Button.tsx";
import {EditIcon} from "../Components/Icon/EditIcon.tsx";
import {colors} from "../theme/colors.ts";
import {useEffect, useState} from "react";
import {OrderDetailsDrawer} from "../widgets/Orders/OrderDetailsDrawer.tsx";
import {OrderStatusChart, type OrderStatusChartProps} from "../widgets/Charts/OrderStatusChart.tsx";
import {useAllOrdersQuery} from "../api/slices/ordersApiSlice.ts";
import {MdOutlineFileCopy} from "react-icons/md";
const {RangePicker} = DatePicker
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {useGetUserByIdQuery} from "../api/slices/userApiSlice.ts";
import type {OrderDto} from "../types/dto/OrderDto.ts";

export const CustomerCell = ({record} : {record:OrderType}) => {
    const {data:user} = useGetUserByIdQuery(record.userId);
    return (
               <Space>
                   <Avatar size={"small"} src={user?.avatar}/>
                   <Text style={text3}>{user?.lastName}</Text>
               </Space>
    )
}


const columns: TableProps<OrderType>["columns"] = [
    {
        title: "Order",
        dataIndex: "id",
        render: (_, record) =>
            <Flex justify={"space-between"} align={"center"}>
                <Text style={text3}>{record.id.hideRest(8)}</Text>
                    <CopyToClipboard text={record.id} onCopy={async () => {
                        await message.info("Copied")
                    }}>
                        <Tooltip title={"Copy"} color={colors.darkText}>
                            <Button type={'text'} style={{padding: 0}} onClick={(e) => {e.stopPropagation()}}>
                                <MdOutlineFileCopy />
                            </Button>
                        </Tooltip>
                    </CopyToClipboard>
            </Flex>,
        width: "15%"
    },

    {
        title: "Customer",
        dataIndex: "userId",
        render: (_,record) => <CustomerCell record={record} />,
    },

    {
        title: "Last update",
        dataIndex: "updatedAt",
        render: (_, record: OrderType) => (
            <Text style={text3}>{dateFormatter.format(new Date(record.orderDateUtc))}</Text>
        ),
        sorter: (a, b) => Number(
            new Date(a.orderDateUtc).valueOf() - new Date(b.orderDateUtc).valueOf() ),
        sortIcon: () =>
            <div style={{padding: "5px 0 0 5px"}}>
                <ArrowsUpDownIcon size={24}/>
            </div>,
        showSorterTooltip: false
    },
    {
        title: "Status",
        dataIndex: "status",
        render: (_, record) => {
            const status = record.status as keyof typeof OrderStatus
            return (
                <Tag color={OrderStatusColors[status]} style={ordersPageStyles.statusTag}>
                    {OrderStatus[status]}
                </Tag>
            )
        },
    },
    {
        title: "Items",
        dataIndex: "totalItems",
        render: (_, record) => <Text style={text3}>{record.itemsCount} items</Text>,
        align: "center",

    },
    {
        title: "Amount",
        dataIndex: "totalAmount",
        render: (_, record) => <Text style={text3}>$ {record.totalAmount}</Text>,
        align: "end",

    },
    {
        title: "",
        width: 10,
        render: () =>
            <Button type={"text"} style={{padding: "20px 0"}}><EditIcon color={colors.secondary}/></Button>
    }
]


export const OrdersPage = () => {
    const [showDrawer, setShowDrawer] = useState(false);
    const [filterOptions, setFilterOptions] = useState<OrderFilterType>({});
    const [selectedRow, setSelectedRow] = useState<OrderType>();

    const {data: orderDto, isFetching} = useAllOrdersQuery(filterOptions)

    const {setSelectedRowKeys, rowSelection} = useAntdTableRowSelect<OrderType>()

    const [firstFetch, _] = useState<OrderDto | undefined> (orderDto)



    const orders = orderDto?.items || []

    const tabs: TabsProps["items"] = Object.entries(OrderStatus).map((v) => ({
        key: v[0],
        label:`${v[0]} (${firstFetch?.statusCounts[v[0]]})`
    }))


    tabs?.splice(0,0,{
        key: "all",
        label: `All (${firstFetch?.totalOrders})`
    })


    return (
       <div>
           <Tabs items={tabs} onChange={(v) => {
               const newFilters = {...filterOptions}
               if (v === "all") delete newFilters.status
               else newFilters.status = v

               setFilterOptions(newFilters)

           }} styles={orderPageTabsStyles}/>

           <Flex>
               
           </Flex>
               <Row gutter={12}>
                   <Col style={ordersPageStyles.tableCol} span={14}>
                       <Table
                            rowSelection={{type: "checkbox", ...rowSelection}}
                            columns={columns}
                            dataSource={orders}
                            styles={antdPageTableStyles<OrderType>()}
                            pagination={{
                                placement: ["bottomCenter"],
                                defaultPageSize: 7,
                                pageSizeOptions: [7, 20, 50, 100],
                                onChange: () => {
                                    setSelectedRowKeys([])
                                },
                                showSizeChanger: true,
                            }}
                            scroll={{y: "60vh"}}
                            rowKey={"id"}
                            loading={isFetching}
                            locale={{emptyText:<ItemNotFound  text={"No orders found"} />}}
                            onRow={(record) => ({
                                onClick: () => {
                                    setShowDrawer(true);
                                    setSelectedRow(record)
                                },
                                style: {cursor: "pointer"}
                            })}
                       />
                   </Col>
                   <Col span={10} style={ordersPageStyles.filterCol}>
                       <OrderStatusChart style={ordersPageStyles.orderStatusChart}
                                         total={orderDto?.totalOrders}
                                         totalAmount={orderDto?.totalAmount}
                                         data={orderDto?.statusCounts} />
                   </Col>
               </Row>
           {selectedRow && <OrderDetailsDrawer open={showDrawer} onClose={() => setShowDrawer(false)} order={selectedRow}/>}
       </div>
    )
}