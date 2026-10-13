import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "../store.ts";
import type {LoginResponseDto} from "../../types/dto/LoginResponseDto.ts";
import {Cookies, setCookie} from "typescript-cookie";
import type {UserType} from "../../types/UserType.ts";

export interface UserSliceType {
    isAuthenticated: boolean;
    user?: UserType
}
const initialState: UserSliceType  = {
    isAuthenticated: false,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        authSuccess: (state) => {
            state.isAuthenticated = true;
        },
        setUser: (state, action: PayloadAction<LoginResponseDto>) => {
            setCookie("jwt", action.payload.accessToken, {
                expires: 7,
                domain: import.meta.env.VITE_BASE_DOMAIN,
                path: "/",
                sameSite: "Lax",
                secure: true,
            });
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        setMe: (state, action: PayloadAction<UserType>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            Cookies.remove("jwt")
            state.isAuthenticated = false;
        }
    },

})

export const {setUser, authSuccess, logout, setMe} = userSlice.actions;
export const isUserAuthenticated = (state: RootState) => state.user.isAuthenticated;
export const getUser = (state: RootState) => state.user.user;
export default userSlice.reducer;