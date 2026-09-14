import {fetchBaseQuery} from "@reduxjs/toolkit/query";

export const baseUserQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_AUTH_URL,

})


// export const baseUserQueryWithRefresh = async (args: (string | FetchArgs), api: BaseQueryApi, extraOptions: {}) => {
//     let result = await baseUserQuery(args, api, extraOptions);
//
// }