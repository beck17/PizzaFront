import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";

export const registerAuth = createAsyncThunk('auth/registerAuth', async (params) => {
    const {data} = await axios.post('/api/auth/register', params)
    return data
})

export const loginAuth = createAsyncThunk('auth/loginAuth', async (params) => {
    const {data} = await axios.post('/api/auth/login', params)
    return data
})

export const getMe = createAsyncThunk('auth/getMe', async () => {
    const {data} = await axios.get('/api/auth/me')
    return data
})

const authSlice = createSlice({
    name: "auth",
    initialState: {
        data: null,
        status: 'loading'
    },
    reducers: {
        logout: (state)=> {
            state.data = null
            state.status = 'loaded'
        }
    },
    extraReducers: {
        // registration
        [registerAuth.pending]: (state) => {
            state.data = null
            state.status = 'loading'
        },
        [registerAuth.fulfilled]: (state, action) => {
            state.data = action.payload
            state.status = 'loaded'
        },
        [registerAuth.rejected]: (state) => {
            state.data = null
            state.status = 'error'
        },
        // login user
        [loginAuth.pending]: (state) => {
            state.data = null
            state.status = 'loading'
        },
        [loginAuth.fulfilled]: (state, action) => {
            state.data = action.payload
            state.status = 'loaded'
        },
        [loginAuth.rejected]: (state) => {
            state.data = null
            state.status = 'error'
        },
        //get User
        [getMe.pending]: (state)=> {
            state.data = null
            state.status = 'loading'
        },
        [getMe.fulfilled]: (state,action)=> {
            state.data = action.payload
            state.status = 'loaded'
        },
        [getMe.rejected]: (state)=> {
            state.data = null
            state.status = 'error'
        },
    }
})

export const selectorIsAuth = (state) => Boolean(state.auth.data)

export const authReducer = authSlice.reducer

export const {logout} = authSlice.actions
