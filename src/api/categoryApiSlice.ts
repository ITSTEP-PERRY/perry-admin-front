import {api} from "./apiSlice.ts";
import type {CategoryType} from "../types/CategoryType.ts";

export const categoryApi = api.injectEndpoints({
    endpoints: builder => ({
        categories: builder.query<CategoryType[], void>({
            query: () => ({
                url: "/categories",
                method: "GET"
            }),
            providesTags: ["Category"]
        }),
        categoryById: builder.query<CategoryType, string>({
            query: (id: string) => ({
                url: `/category-by-id?id=${id}`,
                method: "GET"
            }),
            providesTags: ["Category"],
        }),
        createCategory: builder.mutation<void, FormData>({
           query: (category) => ({
               url: `/category-create`,
               method: "POST",
               body: category,
           }),
            invalidatesTags: ["Category"]

        }),
        deleteCategoryById: builder.mutation({
            query: (id: string) => ({
                url: `/category-by-id?id=${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Category"]

        })
    })
})


export const {
    useCategoriesQuery,
    useCategoryByIdQuery,
    useLazyCategoryByIdQuery,
    useCreateCategoryMutation,
    useDeleteCategoryByIdMutation
} = categoryApi