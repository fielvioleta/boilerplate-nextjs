import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import API from '@/api/api'


interface stateInferface {
    data: [],
}

const initialState: stateInferface = {
    data: [],
}

//
export const fetchLogs = createAsyncThunk(
    'fetchLogs',
    async (params: any, thunkAPI) => {
        try {
            const { data } = await API.get(`/api/logs`, { params: params })
            return data
        } catch (err: any) {
            return thunkAPI.rejectWithValue({ error: err.response.data })
        }
    },
)

export const logsSlice = createSlice({
    name: 'logs',
    initialState,
    reducers: {
    },
    // extraReducers(builder) {
    //     builder
    //         //
    //     //
    // },
})

// export const selectAlllogs = (state: any) => state.logs.logs

export const {

    // setHeaderSelection,
} = logsSlice.actions

export default logsSlice.reducer
