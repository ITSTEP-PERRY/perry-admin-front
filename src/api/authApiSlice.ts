import type {LoginResponseDto} from "../types/dto/LoginResponseDto.ts";
import type {LoginRequestDto} from "../types/dto/LoginRequestDto.ts";
import {apiUser} from "./apiUser.ts";
import type {UserType} from "../types/UserType.ts";

export const refreshTokenArgs = {
    url: "auth/refresh",
    method: "POST"
}

export const authApi = apiUser.injectEndpoints({
    endpoints: builder => ({
        login:  builder.mutation<LoginResponseDto, LoginRequestDto>({
            query: (dto) => ({
                url: "auth/login",
                method: "POST",
                body: {...dto}
            }),
            transformErrorResponse: (response) => {
                return response
            }
        }),
        getMyUser: builder.query<UserType, void>({
            query: () => ({
                url: "auth/me",
                method: "GET"
            })
        }),
        refreshToken: builder.mutation<LoginResponseDto, void>({
            query: () => (refreshTokenArgs)
        })
    })
})

export const {
    useLoginMutation,
    useGetMyUserQuery,
    useRefreshTokenMutation,
} = authApi