import {createSlice} from "@reduxjs/toolkit";
import type {RootState} from "../store.ts";

export interface TableSettingsSliceType {
    view: "row" | "card"
}

const initialState: TableSettingsSliceType = {
    view: "row",
}

export const tableSettingsSlice = createSlice({
    name: "tableSettings",
    initialState,
    reducers: {
        setTableView: (state, action) => {
            state.view = action.payload;
        }
    }

})

export const {setTableView} = tableSettingsSlice.actions;
export const getTableSettings = (state: RootState) => state.tableSettings;
export default tableSettingsSlice.reducer;