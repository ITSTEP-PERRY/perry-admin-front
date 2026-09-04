import {api} from "./apiSlice.ts";
import type {CategoryType} from "../types/CategoryType.ts";

export const categoryApi = api.injectEndpoints({
    endpoints: builder => ({
        categories: builder.query<CategoryType[], void>({
            query: () => ({
                url: "/categories",
                method: "GET"
            })
        }),
        categoryById: builder.query<CategoryType, string>({
            query: (id: string) => ({
                url: `/category-by-id?id=${id}`,
                method: "GET"
            })
        })
    })
})


export const {
    useCategoriesQuery,
    useCategoryByIdQuery,
    useLazyCategoryByIdQuery,
} = categoryApi