import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        products:[],
        quantity:0,
        total:0
    },
    reducers:{
        addProductToCart: (state,action) => {
            state.products.push(action.payload)
            state.quantity += 1
            state.total += action.payload.price * action.payload.quantity
        },
        resetCart:(state) => {
            state.products = []
            state.quantity = 0
            state.total = 0
        }
    }
})

export const {addProductToCart, resetCart} = cartSlice.actions

export const cartReducer = cartSlice.reducer