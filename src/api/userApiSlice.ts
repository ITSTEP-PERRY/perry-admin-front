import type {UserFilterRequest, UserRole} from "../types/UserData.ts";
import {apiUser} from "./apiUser.ts";
import type {UserResponseDto} from "../types/dto/UsersResponseDto.ts";

export const userApi = apiUser.injectEndpoints({
    endpoints: builder => ({
        users: builder.query<UserResponseDto, UserFilterRequest | void>({
            query: (params) => ({
                url: "admin/users",
                method: "GET",
                params: {...params}
            }),
            providesTags: ['Users'],
        }),
        changeUserRole: builder.mutation({
           query: ({id}:{id: string, role: UserRole}) => ({
               url: `admin/users/${id}/role`,
               method: "PATCH"
           }),
            invalidatesTags: ["Users"],

        }),
        setUserStatusById: builder.mutation({
            query: ({id, status}:{id: string, status: string}) => ({
                url: `admin/users/${id}/status`,
                method: "PATCH",
                body: {status}
            }),
            invalidatesTags: ["Users"],
        }),
        setUsersStatus: builder.mutation({
            query: (params:{ids: string[], status: boolean}) => ({
                url: `/users`,
                method: "PATCH",
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