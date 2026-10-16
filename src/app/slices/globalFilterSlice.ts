import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "../store.ts";

export type FilterSliceType = {
    userId?: string,
    productId?: string,
    reviewId?: string,
    orderId?: string
    dateRange?: [Date,Date]
}

const initialState : FilterSliceType = {
    // dateRange: getCurrentRangeMonth()
}

export const globalFilterSlice = createSlice({
    name: "globalFilter",
    initialState,
    reducers: {
        setGlobalFilters: (state, action: PayloadAction<FilterSliceType>) => {
            state.reviewId = action.payload.reviewId;
            state.productId = action.payload.productId;
            state.userId = action.payload.userId;
            state.orderId = action.payload.orderId;
            state.dateRange = action.payload.dateRange;
        },
        resetGlobalFilters: (state) => {
            state.reviewId = "";
            state.productId = "";
            state.userId = "";
            state.orderId = "";
            // state.dateRange = initialState.dateRange;
        }
    },

})

export const {setGlobalFilters, resetGlobalFilters} = globalFilterSlice.actions;
export const getGlobalFilters = (state: RootState) => state.globalFilter;

// export default globalFilterSlice.reducer;