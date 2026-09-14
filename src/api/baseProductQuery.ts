import {fetchBaseQuery} from "@reduxjs/toolkit/query";

export const baseProductQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_PRODUCT_URL,
})