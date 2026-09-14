import {apiProduct} from "./apiProductSlice.ts";
import type {UserData, UserFilterRequest, UserRole} from "../types/UserData.ts";

export const userApi = apiProduct.injectEndpoints({
    endpoints: builder => ({
        users: builder.query<UserData[], UserFilterRequest | void>({
            query: (params) => ({
                url: "/users",
                method: "GET",
                params: {...params}
            }),
            providesTags: ['Users'],
        }),
        changeUserRole: builder.mutation({
           query: ({id, role}:{id: string, role: UserRole}) => ({
               url: `/set-user-role?id=${id}&role=${role}`,
               method: "POST"
           }),
            invalidatesTags: ["Users"],

        }),
        setUserStatusById: builder.mutation({
            query: (id: string) => ({
                url: `/user?id=${id}`,
                method: "POST"
            }),
            invalidatesTags: ["Users"],
        }),
        setUsersStatus: builder.mutation({
            query: (params:{ids: string[], status: boolean}) => ({
                url: `/users`,
                method: "POST",
                params: {...params}
            }),
            invalidatesTags: ["Users"],
        }),
    })
})


export const {
    useUsersQuery,
    useChangeUserRoleMutation,
    useSetUserStatusByIdMutation,
    useSetUsersStatusMutation
} = userApi