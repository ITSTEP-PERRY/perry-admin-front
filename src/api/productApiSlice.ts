import {api} from "./apiSlice.ts";
import type {ProductType} from "../types/ProductType.ts";

export const productApi = api.injectEndpoints({
    endpoints: builder => ({
        products: builder.query<ProductType[], void>({
            query: () => ({
                url: "/products",
                method: "GET",
            })
        }),
    })
})


export const {
    useProductsQuery,
} = productApi;