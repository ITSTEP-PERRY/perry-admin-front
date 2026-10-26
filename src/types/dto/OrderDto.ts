import type {OrderStatusType, OrderType} from "../OrderType.ts";

export interface OrderDto {
    items?: OrderType[];
    page?: number;
    pageSize?: number;
    totalPages?: number;
    totalOrders?: number;
    totalAmount?: number;
    statusCounts?: Record<OrderStatusType, number>;
    totalOrderCompare?: number;
    totalAmountCompare?: number;
    period?: string;
    comparePeriod?: string
}

export interface OrderStatCart {
    period: string;
    points: {
        label: string;
        amount: number;
        ordersCount: number;
        buyersCount: number;
        day: number;
        month: number;
        year: number;
        statuses: keyof OrderStatusType
    }[]
}

export interface OrderStatCartParams {
    period: "month" | "day" | "year";
    sellerId?: string;
    status?: number
}