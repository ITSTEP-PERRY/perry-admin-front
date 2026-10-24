import {apiProduct} from "../api.ts";
import type {OrderStatCart, OrderStatCartParams} from "../../types/dto/OrderDto.ts";

export const statisticApi = apiProduct.injectEndpoints({
    endpoints: builder => ({
        getStatisticChart: builder.query<OrderStatCart, OrderStatCartParams>({
            query: (params) => ({
                url: "admin/statistics/chart",
                method: "GET",
                params: {...params}
            })
        })
    })
})

export const {
    useGetStatisticChartQuery
} = statisticApi;