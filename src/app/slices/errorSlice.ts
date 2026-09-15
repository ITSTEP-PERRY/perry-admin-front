import {createSlice} from "@reduxjs/toolkit";

const initialState  = {
    hasError: false,
    errors: [""]
}

export const errorSlice = createSlice({
    name: "error",
    initialState,
   reducers: {
        setError: (state, action) => {
            state.hasError = true;
            state.errors = action.payload;
        }
   }

})


export default errorSlice.reducer;