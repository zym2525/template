import { userSlice } from '@/reducers/user'
import { createSagaAction, createSagaActionByParams } from '@/reducers/createSagaActions'
import { LoginInput, LoginOutput } from '@/services/userService'

export const { login, appLoaded } = userSlice.actions;

export const loginSaga = createSagaActionByParams<LoginInput, LoginOutput>(login);