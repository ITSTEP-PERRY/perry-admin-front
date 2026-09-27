import type {OrderFilterType, OrderType} from "../../types/OrderType.ts";
import {apiProduct} from "../api.ts";

export const ordersApi = apiProduct.injectEndpoints({
    endpoints: builder => ({
        orders: builder.query<OrderType[], OrderFilterType>({
            query: (opts) =>({
                url: "/orders",
                method: "GET",
                params: opts
            })
        }),
        getOrderById: builder.query<OrderType, string>({
            query: (id: string) => ({
                url: `/order-by-id${id}`,
                method: "GET"
            })
        })
    })
})

export const {
   useOrdersQuery,
    useGetOrderByIdQuery,
} = ordersApi