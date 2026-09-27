import {DatePicker, Flex, Table, type TableProps, Tabs, type TabsProps, Tag} from "antd";
import {BaseSearch} from "../Components/Search/BaseSearch.tsx";
import {orderPageTabsStyles, ordersPageStyles, ordersRangePickerStyles} from "./css/ordersPageStyles.ts";
import {OrderStatusColors, type OrderType, OrderStatus, type OrderFilterType} from "../types/OrderType.ts";
import {useOrdersQuery} from "../api/slices/ordersApiSlice.ts";
import Text from "antd/es/typography/Text";
import {text3} from "../theme/textStyles.ts";
import {antdPageTableStyles} from "../theme/antdTableStyles.ts";
import {dateTimeFormatter} from "../shared/formatter.ts";
import {ArrowsUpDownIcon} from "../Components/Icon/ArrowsUpDownIcon.tsx";
import {ItemNotFound} from "../widgets/ItemNotFound.tsx";
import {useAntdTableRowSelect} from "../shared/Hooks/useAntdTableRowSelect.tsx";
import {Button} from "../Components/Buttons/Button.tsx";
import {EditIcon} from "../Components/Icon/EditIcon.tsx";
import {colors} from "../theme/colors.ts";
import {useState} from "react";
import {OrderDetailsDrawer} from "../widgets/Orders/OrderDetailsDrawer.tsx";
import {OrderStatusChart, type OrderStatusChartProps} from "../widgets/Charts/OrderStatusChart.tsx";
const {RangePicker} = DatePicker

const columns: TableProps<OrderType>["columns"] = [
    {
        title: "Order number",
        dataIndex: "id",
        render: (_, record) => <Text style={text3}>{record.id}</Text>
    },
    {
        title: "Order date",
        dataIndex: "createdAt",
        render: (_, record: OrderType) => (
            <Text style={text3}>{dateTimeFormatter.format(new Date(record.createdAt))}</Text>
        ),
        sorter: (a, b) => Number(
            new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf() ),
        sortIcon: () =>
            <div style={{padding: "5px 0 0 5px"}}>
                <ArrowsUpDownIcon size={24}/>
            </div>,
        showSorterTooltip: false
    },
    {
        title: "Last update",
        dataIndex: "updatedAt",
        render: (_, record: OrderType) => (
            <Text style={text3}>{dateTimeFormatter.format(new Date(record.createdAt))}</Text>
        ),
        sorter: (a, b) => Number(
            new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf() ),
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
        }
    },
    {
        title: "Total items",
        dataIndex: "totalItems",
        render: (_, record) => <Text style={text3}>{record.totalItems} items</Text>,
        align: "center"
    },
    {
        title: "Total Amount",
        dataIndex: "totalAmount",
        render: (_, record) => <Text style={text3}>$ {record.totalAmount}</Text>,
        align: "end"
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
    const {data, isFetching} = useOrdersQuery(filterOptions)
    const {setSelectedRowKeys, rowSelection} = useAntdTableRowSelect<OrderType>()

    const tabs: TabsProps["items"] = Object.entries(OrderStatus).map((v) => ({
        key: v[0],
        label:v[0]
    }))

    tabs?.splice(0,0,{
        key: "all",
        label: "All"
    })

    const chartData: OrderStatusChartProps["data"] = {
        Ordered: 123,
        Shipped: 22,
        Received: 233,
        ReadyForPickup: 23,
        Cancelled: 53
    }

    return (
       <div>
          <OrderStatusChart total={1200} data={chartData} style={{ width: "45%", margin: 20 }} />
           {/*<Flex justify="start" gap={10}>*/}
           {/*{Object.entries(OrderStatus).map(([orderType], i) => (*/}
           {/*    <OrderStatusCard style={ordersPageStyles.statusCard} status={orderType} count={12} icon={<><EditIcon /></>} />*/}
           {/*))}*/}
           {/*</Flex>*/}
            <Flex>
                <BaseSearch />
                <RangePicker styles={ordersRangePickerStyles} picker={"month"}/>
            </Flex>
           <Tabs items={tabs} onChange={(v) => setFilterOptions({...filterOptions, status: v})} styles={orderPageTabsStyles}/>
           <Table
                rowSelection={{type: "checkbox", ...rowSelection}}
                columns={columns}
                dataSource={data}
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
           {selectedRow && <OrderDetailsDrawer open={showDrawer} onClose={() => setShowDrawer(false)} order={selectedRow}/>}
       </div>
    )
}