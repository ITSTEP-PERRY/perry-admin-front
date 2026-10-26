import {
  Avatar,
  Flex,
  Space,
  Table,
} from "antd";
import {
  ordersPageStyles,
} from "./css/ordersPageStyles.ts";
import {
  type OrderType,
  type OrderFilterType,
} from "../types/OrderType.ts";
import Text from "antd/es/typography/Text";
import { text3 } from "../theme/textStyles.ts";
import { antdPageTableStyles } from "../theme/antdTableStyles.ts";
import { ItemNotFound } from "../widgets/ItemNotFound.tsx";
import { useAntdTableRowSelect } from "../shared/Hooks/useAntdTableRowSelect.tsx";
import { Button } from "../Components/Buttons/Button.tsx";
import {useState} from "react";
import { OrderDetailsDrawer } from "../widgets/Orders/OrderDetailsDrawer.tsx";
import { OrderStatusChart } from "../widgets/Charts/OrderStatusChart.tsx";
import { useAllOrdersQuery } from "../api/slices/ordersApiSlice.ts";
import { useGetUserByIdQuery } from "../api/slices/userApiSlice.ts";
import { useAppSelector } from "../app/hooks.ts";
import { BaseSearch } from "../Components/Search/BaseSearch.tsx";
import { getUser } from "../app/slices/userSlice.ts";
import { TableSettings } from "../widgets/Table/TableSettings.tsx";
import {useFilters} from "../shared/Hooks/useFilters.tsx";
import {OrderTabs} from "../widgets/Orders/OrderTabs.tsx";
import {useParams} from "react-router";
import {orderTableColumns} from "../widgets/Orders/orderTableColumns.tsx";
import {OrderAmountChart} from "../widgets/Charts/Order/OrderAmountChart.tsx";
import {header3} from "../theme/headerStyles.ts";

export const CustomerCell = ({ record }: { record: OrderType }) => {
  const { data: user } = useGetUserByIdQuery(record.userId);
  return (
    <Space>
      <Avatar size={"small"} src={user?.avatarUrl} />
      <Text style={text3}>{user?.lastName}</Text>
    </Space>
  );
};


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
        <Text style={header3}>Orders</Text>
      <Flex justify={"space-between"} align={"center"}>
        <OrderStatusChart
          style={ordersPageStyles.orderStatusChart}
          total={orderDto?.totalOrders}
          totalAmount={orderDto?.totalAmount}
          data={orderDto?.statusCounts}
          totalCompareAmount={orderDto?.totalAmountCompare}
          totalCompareOrder={orderDto?.totalOrderCompare}
        />
          <OrderAmountChart style={{ width: "40%",  }} chartHeight={"20vh"} />

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
          columns={orderTableColumns}
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
