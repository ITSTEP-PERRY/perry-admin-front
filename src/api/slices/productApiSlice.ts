import type {FilterOptions} from "../../types/FilterOptions.ts";
import {useAppDispatch} from "../../app/hooks.ts";
import type {ResponseProductsDto} from "../../types/dto/ProductsDto.ts";
import type {ProductType} from "../../types/ProductType.ts";
import {apiProduct} from "../api.ts";

export const productApi = apiProduct.injectEndpoints({
    endpoints: builder => ({
        products: builder.query<ResponseProductsDto, FilterOptions>({
            query: (queryArg) => ({
                url: "products",
                method: "GET",
                params: {...queryArg}
            }),
            providesTags: ["Product"]
        }),
        productById: builder.query<ProductType, string>({
            query: (id) => ({
                url: `products/partial/${id}`,
                method: "GET"
            }),
            providesTags: ["Product"]
        }),
        createProduct: builder.mutation<void, ProductType>({
            query: (data) => ({
                url: "products",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Product"]
        }),
        updateProduct: builder.mutation<void, ProductType>({
            query: (data) => ({
                url: `products/${data.id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Product"]
        }),
        deleteProduct: builder.mutation<void, string>({
            query: (id) => ({
                url: `products/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Product"]
        })
    })
})

export const useRefetchProductsQuery = (params: FilterOptions)=>
    useAppDispatch()(productApi.endpoints.products.initiate(params));

export const {
    useProductsQuery,
    useProductByIdQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productApi;