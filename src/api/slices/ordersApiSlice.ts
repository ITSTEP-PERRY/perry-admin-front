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
            }),
            providesTags: ["Order"]
        }),
        allOrders: builder.query<OrderDto, OrderFilterType>({
            query: (opts) =>({
                url: "orders/admin",
                method: "GET",
                params: opts
            }),
            providesTags: ["Order"]

        }),
        getOrderById: builder.query<OrderType, string>({
            query: (id: string) => ({
                url: `orders/${id}`,
                method: "GET"
            }),
            providesTags: ["Order"]

        }),
        setOrderStatus: builder.mutation<void, {id:string, status: keyof OrderStatusType}>({
            query: ({id, status}) => ({
                url: `orders/${id}/status`,
                method: "PUT",
                body: {status}
            }),
            invalidatesTags: ["Order"]
        })
    })
})

export const {
    useAllOrdersQuery  ,
    useGetOrderByIdQuery,
    useSetOrderStatusMutation,
} = ordersApi