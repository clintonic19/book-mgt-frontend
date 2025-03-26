import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slice/cartSlice';
import { booksApi } from "./slice/booksApi/bookApiSlice"
import ordersApi from './slice/ordersApi/ordersApi';

const store = configureStore({
    reducer: {
        // Add reducers here
        [booksApi.reducerPath] : booksApi.reducer,
        [ordersApi.reducerPath] : ordersApi.reducer,
        cart: cartReducer,
    },

    // Add middleware here
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(booksApi.middleware, ordersApi.middleware),
})


export default store;