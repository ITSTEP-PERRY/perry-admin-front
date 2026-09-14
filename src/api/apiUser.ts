import { createApi } from "@reduxjs/toolkit/query/react";
import {baseQueryWithRefresh, baseUserQuery} from "./baseQuery.ts";

export const apiUser = createApi({
    reducerPath: "apiUser",
    baseQuery: baseQueryWithRefresh(baseUserQuery),
    tagTypes: ["Users"],
    endpoints: () => ({}),
});