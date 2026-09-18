import {apiProduct} from "../apiProduct.ts";
import type {CategoryType} from "../../types/CategoryType.ts";

export const categoryApi = apiProduct.injectEndpoints({
    endpoints: builder => ({
        categories: builder.query<CategoryType[], void>({
            query: () => ({
                url: "categories",
                method: "GET"
            }),
            providesTags: ["Category"]
        }),
        categoryById: builder.query<CategoryType, string>({
            query: (id: string) => ({
                url: `categories/id/${id}`,
                method: "GET"
            }),
            providesTags: ["Category"],
        }),
        categoryBySlug: builder.query<CategoryType, string>({
            query: (slug) => ({
                url: `categories/${slug}`,
                method: "GET"
            }),
            providesTags: ["Category"]

        }),
        createCategory: builder.mutation<void, CategoryType>({
           query: (category) => ({
               url: `categories`,
               method: "POST",
               body: category,
           }),
            invalidatesTags: ["Category"]

        }),
        updateCategory: builder.mutation<void, CategoryType>({
          query: (data) => ({
              url: `categories/${data.id}`,
              method: "PUT",
              body: data
          }),
            invalidatesTags: ["Category"]

        }),
        deleteCategoryById: builder.mutation({
            query: (id: string) => ({
                url: `categories/${id}`,
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
    useDeleteCategoryByIdMutation,
    useUpdateCategoryMutation,
    useCategoryBySlugQuery,
} = categoryApi