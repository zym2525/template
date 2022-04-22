
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CommonState {
    loading: boolean;
    error: string;
    devComponentMode: boolean;
}

const initialState: CommonState = {
    loading: false,
    error: '',
    devComponentMode: false
};

export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        error_message: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
        loading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        startLoading: (state) => {
            state.loading = true;
        },
        endLoading: (state) => {
            state.loading = false;
        },
        toggleDevComponentScreen: (state) => {
            state.devComponentMode = !state.devComponentMode;
        },
    },
})

export const commonActions = commonSlice.actions;

export const selectDevComponentMode = (state: Redux.RootState) => state.common.devComponentMode

export default commonSlice.reducer