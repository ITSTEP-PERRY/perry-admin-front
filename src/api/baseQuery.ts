import {type BaseQueryApi, type FetchArgs, fetchBaseQuery} from "@reduxjs/toolkit/query";
import {getCookie} from "typescript-cookie";
import {refreshTokenArgs} from "./slices/authApiSlice.ts";
import {authSuccess, setUser} from "../app/slices/userSlice.ts";
import type {LoginResponseDto} from "../types/dto/LoginResponseDto.ts";


const prepareHeaders = (headers: Headers) => {
    headers.set("Authorization", `Bearer ${getCookie("jwt")}`);
}

export const baseProductQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_PRODUCT_URL,
    // credentials: "include",
    prepareHeaders: prepareHeaders,

})


export const baseUserQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_AUTH_URL,
    credentials: "include",
    prepareHeaders: prepareHeaders,
    timeout: 40000,
})


export const baseQueryWithRefresh = (fun: ReturnType<typeof fetchBaseQuery>) => {
    return  async (args: (string | FetchArgs), api: BaseQueryApi, extraOptions: {}) => {
        let result = await fun(args, api, extraOptions)
        console.log(result)
        if(result.error?.status === 401)
        {
            const resultRefetch = await fun(refreshTokenArgs, api, extraOptions)
            if (resultRefetch.error?.status !== 401) {
                if (resultRefetch?.data)api.dispatch(setUser(resultRefetch.data as LoginResponseDto))
                result = await fun(args, api, extraOptions)
            }
        }
        if(result?.data){
            api.dispatch(authSuccess())
        }
        return result
    }

}