import { CART_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const cartSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        addToCart:builder.mutation({
            query:(data)=>({
                url:CART_URL,
                method:'POST',
                body:data
            }),
            invalidatesTags:['Cart']
        }),
        getCartItems:builder.query({
            query:()=>({
                url:`${CART_URL}`,
            }),
            keepUnusedDataFor:5,
            providesTags: ['Cart']
         
        }),
        addShippingAddress:builder.mutation({
            query:(data)=>({
                url:CART_URL,
                method:'PUT',
                body:data
            }),
            invalidatesTags:['Cart']
        }),
        removeCartItems:builder.mutation({
            query:()=>({
                url:CART_URL,
                method:'DELETE'
            }),
            invalidatesTags:['Cart']
        }),
        addPaymentMethod:builder.mutation({
            query:(data)=>({
                url:`${CART_URL}/payment`,
                method:'PUT',
                body:data
            })
        })

    })
})

export const {useAddToCartMutation,useGetCartItemsQuery,
    useAddShippingAddressMutation,useRemoveCartItemsMutation,useAddPaymentMethodMutation}=cartSlice;