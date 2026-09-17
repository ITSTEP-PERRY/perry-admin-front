import {DatePicker, Flex,Table, type TableProps, Tag} from "antd";
import {BaseSearch} from "../Components/Search/BaseSearch.tsx";
import {ordersPageStyles, ordersRangePickerStyles} from "./css/ordersPageStyles.ts";
import {OrderStatusColors, type OrderType, OrderStatus} from "../types/OrderType.ts";
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
import {OrderStatusCard} from "../widgets/Orders/OrderStatusCard.tsx";
import {useState} from "react";
import {OrderDetailsDrawer} from "../widgets/Orders/OrderDetailsDrawer.tsx";

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
    const [selectedRow, setSelectedRow] = useState<OrderType>();
    const {data, isFetching} = useOrdersQuery()
    const {setSelectedRowKeys, rowSelection} = useAntdTableRowSelect<OrderType>()

    return (
       <>
           <OrderStatusCard style={{width: "fit-content", margin: 20}} status={OrderStatus.Ordered} count={12} icon={<><EditIcon /></>} />

            <Flex>
                <BaseSearch />
                <RangePicker styles={ordersRangePickerStyles} picker={"month"}/>
            </Flex>
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
                    }
                }}
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
       </>
    )
}