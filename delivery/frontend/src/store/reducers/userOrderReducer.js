import { createSlice } from '@reduxjs/toolkit';

const initialState = { userOrders: [] };

const userOrderSlice = createSlice({
    name: 'userOrder',
    initialState,
    reducers: {
        setUserOrders: (state, { payload }) => {
            state.userOrders = payload;
        },
    },
});

export const userOrderReducer = userOrderSlice.reducer;

export const { setUserOrders } = userOrderSlice.actions;
