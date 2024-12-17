import { createSlice } from '@reduxjs/toolkit'

interface stateInferface {
    data: object
}

const initialState: stateInferface = {
    data: {
        open: false,
        message: ''
    },
}

export const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        openSnackbar: (state, action) => {
            state.data = { ...state.data, ...action.payload }
        }
    }
})

export const selectSnackbarState = (state: any) => state.snackbar.data

export const {
    openSnackbar
} = snackbarSlice.actions

export default snackbarSlice.reducer
