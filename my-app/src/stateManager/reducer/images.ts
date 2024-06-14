import { createSlice } from "@reduxjs/toolkit";


const Images = createSlice({
    name: "Images",
    initialState: {
        images: null
    },
    reducers: {
        setAllImages: (state, action) => {
            state.images = action.payload.images;
        },
        clearAllImages: (state) => {
            state.images = null;
        }
    }
})

export const {setAllImages, clearAllImages} = Images.actions;
export default Images.reducer;