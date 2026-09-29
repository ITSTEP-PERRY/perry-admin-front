import type {OrderStatusType, OrderType} from "../OrderType.ts";

export interface OrderDto {
    items: OrderType[];
    page: number;
    pageSize: number;
    totalPages: number;
    totalOrders: number;
    totalAmount: number;
    statusCounts: Record<OrderStatusType, number>;
    totalOrderCompare: number;
    totalAmountCompare: number;
    period: string;
    comparePeriod: string
}