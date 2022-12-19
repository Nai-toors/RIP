import { configureStore } from '@reduxjs/toolkit';
import { userOrderReducer } from './reducers/userOrderReducer';
import { orderReducer } from './reducers/orderReducer';
import { userReducer } from './reducers/userReducer';

export const store = configureStore({
    reducer: { order: orderReducer, user: userReducer, userOrder: userOrderReducer },
});
