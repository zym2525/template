import { commonSlice } from '@/reducers/common'
import { createSagaAction } from '@/reducers/createSagaActions'

export const { endLoading, startLoading, loading, error_message } = commonSlice.actions