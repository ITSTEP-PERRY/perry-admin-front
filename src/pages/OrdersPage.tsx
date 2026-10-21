import {
  Avatar,
  Flex,
  message,
  Space,
  Table,
  type TableProps,
  Tag,
  Tooltip,
} from "antd";
import {
  ordersPageStyles,
} from "./css/ordersPageStyles.ts";
import {
  OrderStatusColors,
  type OrderType,
  OrderStatus,
  type OrderFilterType,
} from "../types/OrderType.ts";
import Text from "antd/es/typography/Text";
import { text3 } from "../theme/textStyles.ts";
import { antdPageTableStyles } from "../theme/antdTableStyles.ts";
import { dateFormatter } from "../shared/formatter.ts";
import { ArrowsUpDownIcon } from "../Components/Icon/ArrowsUpDownIcon.tsx";
import { ItemNotFound } from "../widgets/ItemNotFound.tsx";
import { useAntdTableRowSelect } from "../shared/Hooks/useAntdTableRowSelect.tsx";
import { Button } from "../Components/Buttons/Button.tsx";
import { EditIcon } from "../Components/Icon/EditIcon.tsx";
import { colors } from "../theme/colors.ts";
import {useState} from "react";
import { OrderDetailsDrawer } from "../widgets/Orders/OrderDetailsDrawer.tsx";
import { OrderStatusChart } from "../widgets/Charts/OrderStatusChart.tsx";
import { useAllOrdersQuery } from "../api/slices/ordersApiSlice.ts";
import { MdOutlineFileCopy } from "react-icons/md";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useGetUserByIdQuery } from "../api/slices/userApiSlice.ts";
import { useAppSelector } from "../app/hooks.ts";
import { BaseSearch } from "../Components/Search/BaseSearch.tsx";
import { getUser } from "../app/slices/userSlice.ts";
import { TableSettings } from "../widgets/Table/TableSettings.tsx";
import {useFilters} from "../shared/Hooks/useFilters.tsx";
import {OrderTabs} from "../widgets/Orders/OrderTabs.tsx";
import {useParams} from "react-router";

export const CustomerCell = ({ record }: { record: OrderType }) => {
  const { data: user } = useGetUserByIdQuery(record.userId);
  return (
    <Space>
      <Avatar size={"small"} src={user?.avatarUrl} />
      <Text style={text3}>{user?.lastName}</Text>
    </Space>
  );
};

const columns: TableProps<OrderType>["columns"] = [
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

export const OrdersPage = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const {type} = useParams();

  const {filters: filterOptions, setLocalFilters: setFilterOptions} = useFilters<OrderFilterType>({
    status: type
  });

  const [selectedRow, setSelectedRow] = useState<OrderType>();

  const { data: orderDto, isFetching } = useAllOrdersQuery({
    ...filterOptions,
    fromUtc: filterOptions.dateRange?.[1].toISOString(),
    toUtc: filterOptions.dateRange?.[0].toISOString(),
  });
  const { setSelectedRowKeys, rowSelection } =
    useAntdTableRowSelect<OrderType>();

  const orders = orderDto?.items || [];

  const user = useAppSelector(getUser);


  return (
    <div>
      <Flex>
        <OrderStatusChart
          style={ordersPageStyles.orderStatusChart}
          total={orderDto?.totalOrders}
          totalAmount={orderDto?.totalAmount}
          data={orderDto?.statusCounts}
          totalCompareAmount={orderDto?.totalAmountCompare}
          totalCompareOrder={orderDto?.totalOrderCompare}
        />
      </Flex>
      <Flex vertical style={ordersPageStyles.tableCol}>
        <Flex align={"center"} gap={10} justify={"space-between"}>
          <Space size={"large"}>
            <BaseSearch style={ordersPageStyles.baseSearch}
                        placeholder={"Search by order number"}
                        value={filterOptions.orderId}
                        onChange={(v) => {
                          const value = v.target.value
                          setFilterOptions({
                            ...filterOptions,
                            orderId: value.startsWith("#") ? value : "",
                          })
                        }}
            />
            <Button
              style={ordersPageStyles.filterButton}
              type={
                filterOptions.userId && filterOptions.userId === user?.id
                  ? "primary"
                  : "secondary"
              }
              onClick={() => {
                setFilterOptions({
                  ...filterOptions,
                  userId: filterOptions.userId ? undefined : user?.id,
                });
              }}
            >
              Mine
            </Button>
          </Space>
          <TableSettings />
        </Flex>
        <OrderTabs filters={filterOptions} setFilters={setFilterOptions} />
        <Table<OrderType>
          rowSelection={{ type: "checkbox", ...rowSelection }}
          columns={columns}
          dataSource={orders}
          styles={antdPageTableStyles<OrderType>()}
          pagination={{
            placement: ["bottomCenter"],
            defaultPageSize: 7,
            pageSizeOptions: [7, 20, 50, 100],
            onChange: () => {
              setSelectedRowKeys([]);
            },
            showSizeChanger: true,
          }}
          scroll={{ y: "60vh" }}
          rowKey={"id"}
          loading={isFetching}
          locale={{ emptyText: <ItemNotFound text={"No orders found"} /> }}
          onRow={(record) => ({
            onClick: () => {
              setShowDrawer(true);
              setSelectedRow(record);
            },
            style: { cursor: "pointer" },
          })}
        />
      </Flex>
      {selectedRow && (
        <OrderDetailsDrawer
            key={selectedRow.id}
          open={showDrawer}
          onClose={() => setShowDrawer(false)}
          order={selectedRow}
        />
      )}
    </div>
  );
};
