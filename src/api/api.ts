import { createApi } from "@reduxjs/toolkit/query/react";
import {baseAuthQuery, baseProductQuery, baseQueryWithRefresh, baseUserQuery} from "./baseQuery.ts";

export const apiProduct = createApi({
    reducerPath: "apiProduct",
    baseQuery: baseQueryWithRefresh(baseProductQuery),
    tagTypes: ["Users","Category", "Product", "Review"],
    endpoints: () => ({}),
});

export const apiUser = createApi({
    reducerPath: "apiUser",
    baseQuery: baseQueryWithRefresh(baseUserQuery),
    tagTypes: ["Users"],
    endpoints: () => ({}),
});

export const apiAuth = createApi({
    reducerPath: "apiAuth",
    baseQuery: baseQueryWithRefresh(baseAuthQuery),
    endpoints: () => ({}),
})