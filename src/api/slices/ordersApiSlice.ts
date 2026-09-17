import type {OrderType} from "../../types/OrderType.ts";
import {apiProduct} from "../apiProduct.ts";

export const ordersApi = apiProduct.injectEndpoints({
    endpoints: builder => ({
        orders: builder.query<OrderType[], void>({
            query: () =>({
                url: "/orders",
                method: "GET"
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