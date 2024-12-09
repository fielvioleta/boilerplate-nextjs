import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { usersSlice } from './usersSlice'

const makeStore = () =>
    configureStore({
        reducer: {
            [usersSlice.name]: usersSlice.reducer,
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