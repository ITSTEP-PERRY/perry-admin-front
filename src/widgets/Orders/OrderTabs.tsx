import {useMemo,} from "react";
import {useAllOrdersQuery} from "../../api/slices/ordersApiSlice.ts";
import {orderPageTabsStyles} from "../../pages/css/ordersPageStyles.ts";
import {Tabs, type TabsProps} from "antd";
import {type OrderFilterType, OrderStatus} from "../../types/OrderType.ts";
import type {FilterSliceType} from "../../app/slices/globalFilterSlice.ts";


export interface OrderTabsProps {
    filters: FilterSliceType & OrderFilterType,
    setFilters: (filter: FilterSliceType & OrderFilterType) => void,

}

export function OrderTabs({filters, setFilters}: OrderTabsProps) {
    const innerFilter: OrderFilterType = useMemo(() => ({
        userId: filters?.userId,
        fromUtc: filters.dateRange?.[1].toISOString(),
        toUtc: filters.dateRange?.[0].toISOString(),
    }), [filters.userId, filters.dateRange])

    const {data} = useAllOrdersQuery(innerFilter)

    const statusCount = data?.statusCounts
    const total = data?.totalOrders



    const tabs: TabsProps["items"] = Object.entries(OrderStatus).map((v) => ({
        key: v[0],
        label: `${v[0]} (${statusCount?.[v[0]] ?? 0})`,
    }));



    tabs?.splice(0, 0, {
        key: "all",
        label: `All (${total ?? 0})`,
    });
    return (
        <Tabs
            items={tabs}
            onChange={(v) => {
                const newFilters = { ...filters };
                if (v === "all") delete newFilters.status;
                else newFilters.status = v;

                setFilters(newFilters);
            }}
            styles={orderPageTabsStyles}
        />
    )
}