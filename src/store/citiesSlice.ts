import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import API from '@/api/api'


interface stateInferface {
    endOfPage: boolean
}

const initialState: stateInferface = {
    endOfPage: false,
}

//
export const fetchCities = createAsyncThunk(
    'getCities',
    async (params: any, thunkAPI) => {
        try {
            const { data } = await API.get(`/api/cities/`, {
                params: params,
            })
            return data
        } catch (err: any) {
            return thunkAPI.rejectWithValue({ error: err.response.data })
        }
    },
)

export const usersSlice = createSlice({
    name: 'users',
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
} = usersSlice.actions

export default usersSlice.reducer
