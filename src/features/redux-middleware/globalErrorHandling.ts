import {isRejectedWithValue, type Middleware, type MiddlewareAPI} from "@reduxjs/toolkit";
import type {UserApiError} from "../../types/UserApiError.ts";
import {notification} from "antd";

let lastMessage = ""
export const globalErrorHandling: Middleware = (_: MiddlewareAPI) => (next) => (action) => {

    if(isRejectedWithValue(action)) {
        const payload = action.payload as UserApiError;
        if(payload.data && payload.data.message && lastMessage !== payload.data.message) {
            lastMessage = payload.data.message;
            notification.error({
                title: payload.data.message,
            });
        }
    }

    return next(action);
}