import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";

export const getAllProducts = createAsyncThunk('getAllProducts', async () => {
    const {data} = await axios.get('/api/product')
    return data
})

export const getOneProduct = createAsyncThunk('getOneProduct', async (id) => {
    const {data} = await axios.get(`/api/product/${id}`)
    return data
})

const productSlice = createSlice({
    name: "products",
    initialState: {
        product: undefined,
        items: [],
        status: 'loading'
    },
    extraReducers: {
        // get All Products
        [getAllProducts.pending]: (state) => {
            state.items = []
            state.status = 'loading'
        },
        [getAllProducts.fulfilled]: (state,action) => {
            state.items = action.payload
            state.status = 'loaded'
        },
        [getAllProducts.rejected]: (state) => {
            state.items = []
            state.status = 'error'
        },
        [getOneProduct.pending]: (state) => {
            state.product = undefined
            state.status = 'loading'
        },
        [getOneProduct.fulfilled]: (state,action) => {
            state.product = action.payload
            state.status = 'loaded'
        },
        [getOneProduct.pending]: (state) => {
            state.product = undefined
            state.status = 'loading'
        }
    }
})

export const productReducer = productSlice.reducer