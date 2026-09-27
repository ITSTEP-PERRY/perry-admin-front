import {apiProduct} from "../api.ts";
import type {FilterOptions} from "../../types/FilterOptions.ts";
import type {PostProductReviewDto, ProductReviewDto} from "../../types/dto/ReviewDto.ts";
import type {ProductReview, ProductReviewGrade} from "../../types/ProductReview.ts";


export const reviewApi = apiProduct.injectEndpoints({
    endpoints: builder => ({
        allReviews: builder.query<ProductReviewDto, { id?: string, options: FilterOptions<ProductReview> | void }>({
            query: (options) => ({
                url: "reviews",
                method: "GET",
                params: {...options}
            }),
            providesTags: ["Review"]
        }),
        reviewByUserOrProductId: builder.query<ProductReviewDto, {id: string, options?: FilterOptions<ProductReview>}>({
            query: ({id, options}) => ({
                url: `reviews/user-product-id/${id}`,
                method: "GET",
                params: {...options,

                }
            }),
            providesTags: ["Review"]
        }),
        getMyGradeById: builder.query<ProductReviewGrade, string>({
            query: (id) => ({
                url: `reviews/my/${id}`,
                method: "GET"
            }),
            providesTags: ["Review"]
        }),
        reviewById: builder.query<ProductReview, string>({
            query: (id) => ({
                url: `reviews/id/${id}`,
                method: "GET",
            }),
            providesTags: ["Review"]
        }),
        postReview: builder.mutation<void, PostProductReviewDto>({
            query: (data) => ({
                url: "reviews",
                method: "POST",
                body: data
            }),
            invalidatesTags:["Review"]
        }),
        setApprovalReview: builder.mutation<void, string>({
            query: (id) => ({
                url: `reviews/disable/${id}`,
                method: "PATCH"
            }),
            invalidatesTags:["Review"]
        }),
        setApprovalManyReviews: builder.mutation<void, { approved: boolean, ids: string[] }>({
            query: ({ids, approved}) => ({
                url: `reviews/disable-many`,
                method: "PATCH",
                body: {reviewIds: ids, approved}
            }),
            invalidatesTags:["Review"]
        }),
        gradeReview: builder.mutation<void, string>({
            query: (id) => ({
                url: `reviews/grade/${id}`,
                method: "POST"
            }),
            invalidatesTags:["Review"]
        }),
        reportReview: builder.mutation<void, string>({
            query: (id) => ({
                url: `reviews/report/${id}`,
                method: "POST"
            }),
            invalidatesTags:["Review"]
        }),

    })
})

export const {
    useAllReviewsQuery,
    useReviewByUserOrProductIdQuery,
    useReviewByIdQuery,
    useGetMyGradeByIdQuery,
    usePostReviewMutation,
    useGradeReviewMutation,
    useReportReviewMutation,
    useSetApprovalReviewMutation,
    useSetApprovalManyReviewsMutation,
} = reviewApi