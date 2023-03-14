import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchOrderData = createAsyncThunk('fetchOrderData', async (params) => {
    const {data} = await axios.post('api/order', params)
    return data
})

const OrderSlice = createSlice({
    name:'order',
    initialState: {
        order: {},
        status:'loading'
    },
    extraReducers:{
        [fetchOrderData.pending]: (state) => {
            state.status = 'loading'
        },
        [fetchOrderData.fulfilled]: (state,action) => {
            state.order = action.payload
            state.status = 'loaded'
        },
        [fetchOrderData.rejected]: (state) =>{
            state.order = {}
            state.status = 'error'
        }
    }
})

export const orderReducer = OrderSlice.reducer
