import {configureStore} from "@reduxjs/toolkit";
import {categorySlice} from "./slices/categorySlice.ts";
import {userSlice} from "./slices/userSlice.ts";
import {globalErrorHandling} from "../features/redux-middleware/globalErrorHandling.ts";
import {errorSlice} from "./slices/errorSlice.ts";
import {apiAuth, apiProduct, apiUser} from "../api/api.ts";




export const store = configureStore({
        reducer: {
            [apiProduct.reducerPath]: apiProduct.reducer,
            [apiUser.reducerPath]: apiUser.reducer,
            [apiAuth.reducerPath]: apiAuth.reducer,
            category: categorySlice.reducer,
            user: userSlice.reducer,
            error: errorSlice.reducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware()
            .concat(
                apiProduct.middleware,
                apiUser.middleware,
                apiAuth.middleware,
                globalErrorHandling
            ),  // Add new middleware as parameters
    }
)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;