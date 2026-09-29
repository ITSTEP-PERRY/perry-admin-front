import type {OrderFilterType, OrderStatusType, OrderType} from "../../types/OrderType.ts";
import {apiProduct} from "../api.ts";
import type {OrderDto} from "../../types/dto/OrderDto.ts";

export const ordersApi = apiProduct.injectEndpoints({
    endpoints: builder => ({
        mineOrders: builder.query<OrderDto, OrderFilterType>({
            query: (opts) =>({
                url: "orders",
                method: "GET",
                params: opts
            })
        }),
        allOrders: builder.query<OrderDto, OrderFilterType>({
            query: (opts) =>({
                url: "orders/admin",
                method: "GET",
                params: opts
            })
        }),
        getOrderById: builder.query<OrderType, string>({
            query: (id: string) => ({
                url: `orders/${id}`,
                method: "GET"
            })
        }),
        setOrderStatus: builder.mutation<void, {id:string, status: keyof OrderStatusType}>({
            query: ({id, status}) => ({
                url: `orders/${id}/status`,
                method: "PUT",
                body: {status}
            })
        })
    })
})

export const {
    useAllOrdersQuery  ,
    useGetOrderByIdQuery,
    useSetOrderStatusMutation,
} = ordersApi