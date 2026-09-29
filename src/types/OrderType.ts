import {colors} from "../theme/colors.ts";
import type {FilterOptions} from "./FilterOptions.ts";

export const OrderStatus = {
    Received: "Received",
    ReadyToPickup: "Ready For Pickup",
    Shipped: "Shipped",
    Ordered: "Ordered",
    Cancelled: "Cancelled",
    Returned: "Returned",
}

export type OrderStatusType = typeof OrderStatus[keyof typeof OrderStatus];
export const OrderStatusColors: Record<keyof typeof OrderStatus, string> = {
    Cancelled: colors.destructive,
    Ordered: colors.inputBorder,
    Shipped: colors.darkText,
    ReadyToPickup: colors.primary,
    Received: colors.secondary,
    Returned: colors.darkBlue,
}

export interface OrderFilterType extends FilterOptions<OrderType>{
    status?: string;
    fromUtc?: string;
    toUtc?: string;
    orderId?: string;
    productId?: string;
    userId?: string;
    paymentType?: string;
    search?: string;
    sortBy?: string;
    sortDesc?: boolean;

}

export interface OrderType {
    id: string;
    userId: string;
    orderDateUtc: string;
    status: OrderStatusType;
    totalAmount: number;
    itemsCount: number;
    userName: string;
    recipientName: string;
    shippingAddress: string;
    paymentType: string;
    items: OrderItemType[]
}

export interface OrderItemType {
    productId: string;
    productName: string;
    productDescription: string;
    quantity: number;
    unitPrice: number
    lineTotal: number;
    imageUrl: string;
}

