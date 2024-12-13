import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { logsSlice } from './logsSlice'
import { microServicesSlice } from './microServicesSlice'

const makeStore = () =>
    configureStore({
        reducer: {
            [logsSlice.name]: logsSlice.reducer,
            [microServicesSlice.name]: microServicesSlice.reducer,
        },
        devTools: true,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            }),
    })

export const store = makeStore()
export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
>