import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import API from '@/api/api'


interface stateInferface {
    endOfPage: boolean
}

const initialState: stateInferface = {
    endOfPage: false,
}

//
export const fetchMicroServices = createAsyncThunk(
    'fetchMicroServices',
    async (params: any, thunkAPI) => {
        try {
            const { data } = await API.get(`/api/definitions/micro-services`, {
                params: params,
            })
            return data
        } catch (err: any) {
            return thunkAPI.rejectWithValue({ error: err.response.data })
        }
    },
)

export const createMicroServices = createAsyncThunk(
    'createMicroServices',
    async (params: any, thunkAPI) => {
        try {
            const { data } = await API.post(`/api/definitions/micro-services`, params)
            return data
        } catch (err: any) {
            return thunkAPI.rejectWithValue({ error: err.response.data })
        }
    },
)

export const microServicesSlice = createSlice({
    name: 'microServices',
    initialState,
    reducers: {
    },
    // extraReducers(builder) {
    //     builder
    //         //
    //     //
    // },
})

// export const selectAllUsers = (state: any) => state.users.users

export const {

    // setHeaderSelection,
} = microServicesSlice.actions

export default microServicesSlice.reducer
