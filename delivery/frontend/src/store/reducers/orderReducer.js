import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orders: [],
    inWork: [],
    order: {},
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrders: (state, { payload }) => {
            state.orders = payload;
        },
        setInWork: (state, { payload }) => {
            const array = [...new Set(payload.map((order) => order.order))];
            state.inWork = array;
        },
        setInWorkManager: (state, { payload }) => {
            const array = [...new Set(payload.map((order) => order.order.id_order))];
            state.inWork = array;
        },
        setOrder: (state, { payload }) => {
            state.order = payload;
        },
        resetOrder: (state) => {
            state.order = {};
        },
    },
});

export const orderReducer = orderSlice.reducer;

export const { resetOrder, setOrder, setInWork, setOrders, setInWorkManager } = orderSlice.actions;
