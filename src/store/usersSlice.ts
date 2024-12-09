import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// import API from '@/api/api'

// const API_ENDPOINT = process.env.API_ENDPOINT

interface stateInferface {
    endOfPage: boolean
}

const initialState: stateInferface = {
    endOfPage: false,
}

//
export const fetchUsers = createAsyncThunk(
    'getUsers',
    async (params: any, thunkAPI) => {
        try {
            const { data } = await API.get(`${API_ENDPOINT}/users/`, {
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

export const selectAllUsers = (state: any) => state.users.users
export const selectAllADUsers = (state: any) => state.users.adusers
export const selectAllRoles = (state: any) => state.users.roles
export const selectAllBrands = (state: any) => state.users.brands
export const selectAllBranches = (state: any) => state.users.branches
export const selectSelectedUser = (state: any) => state.users.selectedUser
export const selectSelectedPage = (state: any) => state.users.selectedPage
export const selectPageCount = (state: any) => state.users.pageCount

export const getPostsStatus = (state: any) => state.users.status
export const getPostsError = (state: any) => state.users.error

export const {
    // setSelectedUser,
    // setSelectedPage,
    // setTyping,
    // setHeaderSelection,
} = usersSlice.actions

export default usersSlice.reducer
