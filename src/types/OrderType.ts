import {colors} from "../theme/colors.ts";

export const OrderStatus = {
    Received: "Received",
    ReadyForPickup: "Ready For Pickup",
    Shipped: "Shipped",
    Ordered: "Ordered",
    Cancelled: "Cancelled",
}

export type OrderStatusType = typeof OrderStatus[keyof typeof OrderStatus];
export const OrderStatusColors: Record<keyof typeof OrderStatus, string> = {
    Cancelled: colors.destructive,
    Ordered: colors.inputBorder,
    Shipped: colors.inputBorder,
    ReadyForPickup: colors.primary,
    Received: colors.secondary,
}
export interface OrderType {
    id: string;
    userId: string;
    customerId: string;
    status: OrderStatusType;
    totalItems: number;
    totalAmount: number;
    createdAt: string;
    updatedAt: string;
    orderChannel: string
}