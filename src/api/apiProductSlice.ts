import { createApi } from "@reduxjs/toolkit/query/react";
import {baseProductQuery} from "./baseQuery.ts";

export const apiProduct = createApi({
    reducerPath: "apiProduct",
    baseQuery: baseProductQuery,
    tagTypes: ["Users","Category", "Product"],
    endpoints: () => ({}),
});