import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const API_URL = "http://localhost:5002";

const baseQuery = fetchBaseQuery({baseUrl: API_URL + "/api/books"},{
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token = localStorage.getItem('token');
        if(token){
            Headers.set('Authorization', `Bearer ${token}`);
        }
        return Headers;
    }
}); 

export const booksApi = createApi({
    reducerPath: 'bookApi',
    baseQuery,
    tagTypes:['Books'],
    // endpoints: () => ({}),

    endpoints: (builder) => ({
        // Get all books
        fetchAllBooks: builder.query({
            query: (data) => ({
                url: '/',
                method: 'GET',
                body: data,
                providesTags: ['Books']
            })
        }),

        // Get a book by ID
        fetchBookById: builder.query({
            query: (id) => ({
                url: `/${id}`,
                method: 'GET',
                providesTags: (result, error, id) => [{ type: 'Books', id }],
            })
        }),

        // Add a book
        addBook: builder.mutation({
            query: (data) => ({
                url: '/create-book',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Books']
        }),

        // Update a book
        updateBook: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/edit/${id}`,
                method: 'PUT',
                body: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ['Books']
        }),

        // Delete a book
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Books']
        }),
        
    }),

    // endpoints: (builder)=>({
    //     fetchAllBooks: builder.query({
    //         query:()=>"/",
    //         providesTags: ["Books"]
    //     })
    // })


});


export const { useFetchAllBooksQuery, useFetchBookByIdQuery, useAddBookMutation, 
                useUpdateBookMutation, useDeleteBookMutation } = booksApi
export default booksApi;









































// import {apiSlice} from "../ApiSlice";

// const BOOK_URL = "/books";

// export const bookApiSlice = apiSlice.injectEndPoints({

//     endpoints: (builder) => ({
//         // Get all books
//         fetchAllBooks: builder.query({
//             query: (data) => ({
//                 url: `${BOOK_URL}/`,
//                 method: "GET",
//                 body: data,
//                 providesTags: ["Book"]
//             })
//         })



//     })

// })

