import { createApi } from "@reduxjs/toolkit/query/react";
import {baseUserQuery} from "./baseUserQuery.ts";

export const apiUser = createApi({
    reducerPath: "apiUser",
    baseQuery: baseUserQuery,
    tagTypes: ["User"],
    endpoints: () => ({}),
});