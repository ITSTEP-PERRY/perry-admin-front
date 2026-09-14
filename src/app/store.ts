import {configureStore} from "@reduxjs/toolkit";
import {apiProduct} from "../api/apiProductSlice.ts";
import {categorySlice} from "./slices/categorySlice.ts";
import {apiUser} from "../api/apiUser.ts";
import {userSlice} from "./slices/userSlice.ts";
import {globalErrorHandling} from "../features/redux-middleware/globalErrorHandling.ts";




export const store = configureStore({
        reducer: {
            [apiProduct.reducerPath]: apiProduct.reducer,
            [apiUser.reducerPath]: apiUser.reducer,
            category: categorySlice.reducer,
            user: userSlice.reducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware()
            .concat(
                apiProduct.middleware,
                apiUser.middleware,
                globalErrorHandling
            ),  // Add new middleware as parameters
    }
)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;