import { createSlice } from '@reduxjs/toolkit'


interface stateInferface {
    environment: string,
}

const initialState: stateInferface = {
    environment: 'deveu',
}

//
export const environmentSlice = createSlice({
    name: 'environment',
    initialState,
    reducers: {
        setEnvironment: (state, action) => {
            localStorage.setItem('env', action.payload)
            state.environment = action.payload
        }
    }
})

export const selectEnvironment = (state: any) => state.environment.environment

export const {
    setEnvironment
} = environmentSlice.actions

export default environmentSlice.reducer
