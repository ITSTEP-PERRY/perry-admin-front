import {apiProduct} from "../apiProduct.ts";
import type {FilterOptions} from "../../types/FilterOptions.ts";
import {useAppDispatch} from "../../app/hooks.ts";
import type {ResponseProductsDto} from "../../types/dto/ProductsDto.ts";

export const productApi = apiProduct.injectEndpoints({
    endpoints: builder => ({
        products: builder.query<ResponseProductsDto, FilterOptions>({
            query: (queryArg) => ({
                url: "products",
                method: "GET",
                params: {...queryArg}
            }),
        }),
        productById: builder.query<>()
    })
})

export const useRefetchProductsQuery = (params: FilterOptions)=>
    useAppDispatch()(productApi.endpoints.products.initiate(params));

export const {
    useProductsQuery
} = productApi;