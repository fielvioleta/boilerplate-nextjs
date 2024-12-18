import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { logsSlice } from './logsSlice'
import { microServicesSlice } from './microServicesSlice'
import { snackbarSlice } from './snackbarSlice'
import { environmentSlice } from './environmentSlice'

const makeStore = () =>
    configureStore({
        reducer: {
            [logsSlice.name]: logsSlice.reducer,
            [microServicesSlice.name]: microServicesSlice.reducer,
            [snackbarSlice.name]: snackbarSlice.reducer,
            [environmentSlice.name]: environmentSlice.reducer,
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