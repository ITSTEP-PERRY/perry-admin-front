import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "../store.ts";
import type {LoginResponseDto} from "../../types/dto/LoginResponseDto.ts";
import {setCookie, removeCookie} from "typescript-cookie";

const initialState  = {
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
            });
            state.isAuthenticated = true;
        },
        logout: (state) => {
            removeCookie("jwt");
            state.isAuthenticated = false;
        }
    },

})

export const {setUser, authSuccess, logout} = userSlice.actions;
export const isUserAuthenticated = (state: RootState) => state.user.isAuthenticated;

export default userSlice.reducer;