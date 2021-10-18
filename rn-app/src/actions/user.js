import { userSlice } from '@/reducers/user'
import { createSagaAction, createSagaActionByParams } from '@/reducers/createSagaActions'

export const { login } = userSlice.actions;

export const loginSaga = createSagaActionByParams(login);