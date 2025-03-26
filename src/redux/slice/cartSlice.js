import { createSlice } from "@reduxjs/toolkit";
import  Swal  from "sweetalert2";

const initialState = {
    cartItems: [],
    // shippingAddress: {}
}

const cartSlice = createSlice({
    name: 'cart',

    initialState,
    reducers: {
        // Add Product/Item to cart
        addToCart: (state, action) =>{
          // Check if the item/product is already in the cart OR NOT
            const product = state.cartItems.find(item => item._id === action.payload._id);
            if(!product){
                state.cartItems.push(action.payload);
                Swal.fire({
                    title: "Item added to cart successfully",
                    icon: "success",
                    draggable: true
                  });
            }else{
                Swal.fire({
                    title: "Item already added to Cart",
                    icon: "question",
                    draggable: true
                  });
            }
        },

        // Remove Product/Item from cart
        removeFromCart: (state, action) =>{
            state.cartItems = state.cartItems.filter(item => item._id  !== action.payload._id);
        },

        // Clear Cart or Products Added to Cart
        clearCart: (state) =>{
            state.cartItems = [];
        }
    }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;