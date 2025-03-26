import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../booksApi/bookApiSlice';


// const API_URL = "http://localhost:5002";

//
const baseQuery = fetchBaseQuery({baseUrl: {API_URL} + "/api/orders"},{
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token = localStorage.getItem('token');
        if(token){
            Headers.set('authorization', `Bearer ${token}`);
        }
        return Headers;
    }
});

// Create a baseQuery object
export const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery,
    tagTypes:['Orders'],
    // endpoints: () => ({}),


    // Create endpoints
    endpoints: (builder) =>({
        // CREATE all orders
        createOrder: builder.mutation({
            query: (newOrder) => ({
                url: '/',
                method: 'POST',
                body: newOrder,
                credentials: 'include',
                providesTags: ['Orders']
            })
        }),

        //GET ORDERS BY EMAIL
        getOrderByEmail: builder.query({
            query: (email) => ({
                url: `/email/${email}`,
                method: 'GET',
                body: email,
                credentials: 'include',
            }),
            providesTags: ['Orders']
    })


})

});

// Export the createOrder endpoint
export const { useCreateOrderMutation, useGetOrderByEmailQuery } = ordersApi;
export default ordersApi;