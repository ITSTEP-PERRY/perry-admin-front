import {apiProduct} from "../api.ts";
import type {WishListByProductStats, WishListStats, WishListSummaryStats} from "../../types/Wishlist.ts";

export const wishlistApi = apiProduct.injectEndpoints({
    endpoints: builder => ({
        getWishlistStat: builder.query<WishListStats, string>({
            query: (year) => ({
                url: "admin/wishlist/monthly",
                method: "GET",
                params: {year}
            })
        }),
        getWishListByProductId: builder.query<WishListByProductStats, {productId: string, year: string}>({
            query: (v) => ({
                url: `admin/wishlist/products/${v.productId}/stats`,
                method: "GET",
                params: {year: v.year}
            })
        }),
        getWishListSummary: builder.query<WishListSummaryStats, number>({
            query: (take) => ({
                url: "admin/wishlist/summary",
                method: "GET",
                params: {take}
            })
        })
    })
})

export const {
    useGetWishlistStatQuery,
    useGetWishListSummaryQuery,
    useGetWishListByProductIdQuery,
} = wishlistApi;