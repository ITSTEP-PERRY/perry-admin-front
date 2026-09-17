import { createApi } from "@reduxjs/toolkit/query/react";
import {baseProductQuery, baseQueryWithRefresh} from "./baseQuery.ts";

export const apiProduct = createApi({
    reducerPath: "apiProduct",
    baseQuery: baseQueryWithRefresh(baseProductQuery),
    tagTypes: ["Users","Category", "Product"],
    endpoints: () => ({}),
});