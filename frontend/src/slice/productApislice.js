import { PRODUCT_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApislice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getProducts:builder.query({
            query:({keyword,pageNumber})=>({
                url:PRODUCT_URL,
                params:{
                    keyword,
                    pageNumber
                }
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
            query:(data)=>({
                url:PRODUCT_URL,
                method:'POST',
                body:data
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
        }),
        createReview: builder.mutation({
            query: (data) => ({
              url: `${PRODUCT_URL}/${data.ProductID}/reviews`,
              method: 'POST',
              body: data,
            }),
            invalidatesTags: ['Product'],
          }),
        gettopproduct:builder.query({
            query:()=>({
                url:`${PRODUCT_URL}/top`,
            }),
            providesTags:['Products'],
            keepUnusedDataFor:5
        })
    })
})

export const {useGetProductsQuery,useGetProductDetailsQuery,
    useCreateproductMutation,useUpdateproductMutation,
    useUploadproductimageMutation,useDeleteProductMutation,useCreateReviewMutation,useGettopproductQuery}=productsApislice;