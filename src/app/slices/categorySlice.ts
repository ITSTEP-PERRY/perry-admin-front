import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {CategoryType} from "../../types/CategoryType.ts";
import type {RootState} from "../store.ts";

const initialState: CategoryType = {
    id: "",
    name: "",
    slug: ""
}

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setCurrentCategory: (state, action: PayloadAction<CategoryType>) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.slug = action.payload.slug;
            state.description = action.payload.description;
            state.parentCategoryId= action.payload.parentCategoryId;
            state.iconUrl = action.payload.iconUrl;
            state.imageUrl = action.payload.imageUrl;
            state.isActive = action.payload.isActive;
            state.subCategories = action.payload.subCategories;
        }
    }
})

export const {setCurrentCategory} = categorySlice.actions;

export const getCurrentCategory = (state: RootState) => state.category

export default categorySlice.reducer;