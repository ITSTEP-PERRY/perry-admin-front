import {Table} from "antd";
import type {OrderFilterType, OrderType} from "../../types/OrderType.ts";
import {antdPageTableStyles} from "../../theme/antdTableStyles.ts";
import {ItemNotFound} from "../ItemNotFound.tsx";
import {OrderDetailsDrawer} from "./OrderDetailsDrawer.tsx";
import {orderTableColumns} from "./orderTableColumns.tsx";
import {useFilters} from "../../shared/Hooks/useFilters.tsx";
import {useState} from "react";
import {useAllOrdersQuery} from "../../api/slices/ordersApiSlice.ts";

export const OrderSimpleTable = () => {
    const {filters: filterOptions} = useFilters<OrderFilterType>({
        sortBy: "lastUpdateUtc",
        sortDesc: true,
        pageSize: 5
    });

    const [showDrawer, setShowDrawer] = useState(false);

    const [selectedRow, setSelectedRow] = useState<OrderType>();

    const { data: orderDto, isFetching } = useAllOrdersQuery({
        ...filterOptions,
        fromUtc: filterOptions.dateRange?.[1].toISOString(),
        toUtc: filterOptions.dateRange?.[0].toISOString(),
    });
    const orders = orderDto?.items || [];

    return (
        <>
        <Table<OrderType>
            columns={orderTableColumns}
            dataSource={orders}
            styles={antdPageTableStyles<OrderType>()}
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
            pagination={false}
        />
            {selectedRow && (
                <OrderDetailsDrawer
                    key={selectedRow.id}
                    open={showDrawer}
                    onClose={() => setShowDrawer(false)}
                    order={selectedRow}
                />
            )}
        </>
    )
}