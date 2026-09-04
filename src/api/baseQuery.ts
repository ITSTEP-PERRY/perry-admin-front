import {fetchBaseQuery} from "@reduxjs/toolkit/query";

export const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
})