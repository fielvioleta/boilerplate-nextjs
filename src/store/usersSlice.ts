import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import API from '@/api/api'

const API_ENDPOINT = process.env.API_ENDPOINT

interface stateInferface {
    currentUser: object,
    endOfPage: boolean,
    status: 'idle' | 'pending' | 'searching' | 'success' | 'error';
}

const initialState: stateInferface = {
    currentUser: {},
    endOfPage: false,
    status: 'idle'
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

export const loginUser = createAsyncThunk(
    'loginUser',
    async (params: any, thunkAPI) => {
        try {
            const { data } = await API.post(`/api/users/login`, params)
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
    extraReducers(builder) {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                localStorage.setItem('token', action.payload.token)
                state.status = 'success';
            })
            .addCase(loginUser.rejected, (state) => {
                state.status = 'error';
            })
    },


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
