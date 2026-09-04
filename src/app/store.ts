import {configureStore} from "@reduxjs/toolkit";
import {api} from "../api/apiSlice.ts";
import {categorySlice} from "./slices/categorySlice.ts";
export const store = configureStore({
        reducer: {
            [api.reducerPath]: api.reducer,
            category: categorySlice.reducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware()
            .concat(
                api.middleware,
            ),  // Add new middleware as parameters
    }
)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;