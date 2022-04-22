import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import { LoginOutput, SubjectListItem } from '@/services/userService'


export interface UserState {
    user: null | LoginOutput;
    appIsLoaded: boolean;
}

const initialState: UserState = {
    user: null,
    appIsLoaded: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<LoginOutput>) => {
            state.user = action.payload;
        },
        appLoaded: (state) => {
            state.appIsLoaded = true
        },

    },
})

export const selectUser = (state: Redux.RootState) => state.user.user as LoginOutput

export default userSlice.reducer