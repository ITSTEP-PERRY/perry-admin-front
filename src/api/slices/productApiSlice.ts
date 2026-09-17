import {apiProduct} from "../apiProduct.ts";
import type {ProductType} from "../../types/ProductType.ts";
import type {FilterOptions} from "../../types/FilterOptions.ts";
import {useAppDispatch} from "../../app/hooks.ts";

export const productApi = apiProduct.injectEndpoints({
    endpoints: builder => ({
        products: builder.query<ProductType[], FilterOptions>({
            query: (queryArg) => ({
                url: "/products",
                method: "GET",
                params: {...queryArg}
            }),
        }),
    })
})

export const useRefetchProductsQuery = (params: FilterOptions)=>
    useAppDispatch()(productApi.endpoints.products.initiate(params));

export const {
    useProductsQuery
} = productApi;