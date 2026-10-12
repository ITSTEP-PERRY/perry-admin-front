import {createSlice} from "@reduxjs/toolkit";
import type {OrderDto} from "../../types/dto/OrderDto.ts";
import type {RootState} from "../store.ts";

const initialState: OrderDto = {
}

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setOrderCounts: (state, action: {payload: OrderDto}) => {
            state.statusCounts = {...action.payload.statusCounts};
            state.totalOrders = action.payload.totalOrders;
            console.log("state", state);
        }
    }

})

export const {setOrderCounts} = orderSlice.actions;
export const getOrderCounts = (state: RootState) => state.order;
export default orderSlice.reducer;