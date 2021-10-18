
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    error: '',
};

export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        error_message: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        loading: (state, action) => {
            state.loading = action.payload
        },
        startLoading: (state, action) => {
            state.loading = true;
        },
        endLoading: (state, action) => {
            state.loading = false;
        },
    },
})

export const commonActions = commonSlice.actions

export default commonSlice.reducer