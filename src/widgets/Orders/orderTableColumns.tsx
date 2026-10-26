import {Flex, message, type TableProps, Tag, Tooltip} from "antd";
import {OrderStatus, OrderStatusColors, type OrderType} from "../../types/OrderType.ts";
import Text from "antd/es/typography/Text";
import {text3} from "../../theme/textStyles.ts";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {colors} from "../../theme/colors.ts";
import {Button} from "../../Components/Buttons/Button.tsx";
import {MdOutlineFileCopy} from "react-icons/md";
import {dateFormatter} from "../../shared/formatter.ts";
import {ArrowsUpDownIcon} from "../../Components/Icon/ArrowsUpDownIcon.tsx";
import {ordersPageStyles} from "../../pages/css/ordersPageStyles.ts";
import {EditIcon} from "../../Components/Icon/EditIcon.tsx";
import {CustomerCell} from "../../pages/OrdersPage.tsx";

export const orderTableColumns: TableProps<OrderType>["columns"] = [
    {
        title: "Order",
        dataIndex: "orderNumber",
        render: (_, record) => (
            <Flex justify={"space-between"} align={"center"}>
                <Text style={text3}>{record.orderNumber}</Text>
                <CopyToClipboard
                    text={record.id}
                    onCopy={async () => {
                        await message.info("Copied");
                    }}
                >
                    <Tooltip title={"Copy"} color={colors.darkText}>
                        <Button
                            type={"text"}
                            style={{ padding: 0 }}
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        >
                            <MdOutlineFileCopy />
                        </Button>
                    </Tooltip>
                </CopyToClipboard>
            </Flex>
        ),
        width: "15%",
    },

    {
        title: "Customer",
        dataIndex: "userId",
        render: (_, record) => <CustomerCell record={record} />,
    },

    {
        title: "Last update",
        dataIndex: "updatedAt",
        render: (_, record: OrderType) => (
            <Text style={text3}>
                {dateFormatter.format(new Date(record.orderDateUtc))}
            </Text>
        ),
        sorter: (a, b) =>
            Number(
                new Date(a.orderDateUtc).valueOf() - new Date(b.orderDateUtc).valueOf(),
            ),
        sortIcon: () => (
            <div style={{ padding: "5px 0 0 5px" }}>
                <ArrowsUpDownIcon size={24} />
            </div>
        ),
        showSorterTooltip: false,
    },
    {
        title: "Status",
        dataIndex: "status",
        render: (_, record) => {
            const status = record.status as keyof typeof OrderStatus;
            return (
                <Tag
                    color={OrderStatusColors[status]}
                    style={ordersPageStyles.statusTag}
                >
                    {OrderStatus[status]}
                </Tag>
            );
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
        render: () => (
            <Button type={"text"} style={{ padding: "20px 0" }}>
                <EditIcon color={colors.secondary} />
            </Button>
        ),
    },
];
