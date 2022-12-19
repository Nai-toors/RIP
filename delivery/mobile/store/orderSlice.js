import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orders: [],
    order: {},
};

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrders: (state, { payload }) => {
            console.log('setOrders');
            state.orders = payload;
        },
        setOrder: (state, { payload }) => {
            console.log('setOrder');
            state.order = payload;
        },
        resetOrder: (state) => {
            console.log('resetOrder');
            state.order = {};
        },
    },
});

export const orderReducer = orderSlice.reducer;

export const { setOrders, setOrder, resetOrder } = orderSlice.actions;
