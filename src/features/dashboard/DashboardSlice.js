import { createSlice } from "@reduxjs/toolkit";

export const ImagesSlice = createSlice({
    name: "dashboard",
    initialState: {
        imagesData: [],
        status: "idle",
        error: false,
        page: 1
    },
    reducers: {

        updateImages(state, action) {
            state.imagesData = action.payload
        },
        incrementPage(state) {
            state.page += 1
        },
        decrementPage(state) {
            if (state.page > 1) {
                state.page -= 1
            }
        }
    }
})