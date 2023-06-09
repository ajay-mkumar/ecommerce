import { PRODUCT_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApislice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getProducts:builder.query({
            query:()=>({
                url:PRODUCT_URL,
            }),
            providesTags:['Products'],
            keepUnusedDataFor:5
        }), 
        getProductDetails:builder.query({
            query:(productId)=>({
                url:`${PRODUCT_URL}/${productId}`,
            }),
            providesTags:['Products'],
            keepUnusedDataFor:5
        }),
        createproduct:builder.mutation({
            query:()=>({
                url:PRODUCT_URL,
                method:'POST'
            }),
            invalidatesTags:['Products']
        }),
        updateproduct:builder.mutation({
            query:(data)=>({
                url:`${PRODUCT_URL}/${data.productId}`,
                method:'PUT',
                body:data
            }),
            invalidatesTags:['Products']
        }),
        uploadproductimage:builder.mutation({
            query:(data)=>({
                url:UPLOAD_URL,
                method:'POST',
                body:data
            }),
        }),
        deleteProduct:builder.mutation({
            query:(productId)=>({
                url:`${PRODUCT_URL}/${productId}`,
                method:'DELETE',
            })
        })
    })
})

export const {useGetProductsQuery,useGetProductDetailsQuery,
    useCreateproductMutation,useUpdateproductMutation,useUploadproductimageMutation,useDeleteProductMutation}=productsApislice;