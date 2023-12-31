import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const appApi = createApi({
	reducerPath: 'appApi',
	baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_API_URL }),
	endpoints: (builder) => ({
		signup: builder.mutation({
			query: (user) => ({
				url: '/users/signup',
				method: 'POST',
				body: user,
			}),
		}),

		login: builder.mutation({
			query: (user) => ({
				url: '/users/login',
				method: 'POST',
				body: user,
			}),
		}),
		getPaymentOption: builder.query({
			query: (id) => `/payments/get-payment-option`,
		}),

		// creating product
		createProduct: builder.mutation({
			query: (product) => ({
				url: '/products',
				body: product,
				method: 'POST',
			}),
		}),

		deleteProduct: builder.mutation({
			query: ({ product_id, user_id }) => ({
				url: `/products/${product_id}`,
				body: {
					user_id,
				},
				method: 'DELETE',
			}),
		}),

		updateProduct: builder.mutation({
			query: (product) => ({
				url: `/products/${product.id}`,
				body: product,
				method: 'PATCH',
			}),
		}),

		// add to cart
		addToCart: builder.mutation({
			query: (cartInfo) => ({
				url: '/products/add-to-cart',
				body: cartInfo,
				method: 'POST',
			}),
		}),
		// remove from cart
		removeFromCart: builder.mutation({
			query: (body) => ({
				url: '/products/remove-from-cart',
				body,
				method: 'POST',
			}),
		}),

		// increase cart
		increaseCartProduct: builder.mutation({
			query: (body) => ({
				url: '/products/increase-cart',
				body,
				method: 'POST',
			}),
		}),

		// decrease cart
		decreaseCartProduct: builder.mutation({
			query: (body) => ({
				url: '/products/decrease-cart',
				body,
				method: 'POST',
			}),
		}),
		// get orders
		getOrder: builder.query({
			query: (prop) => ({
				url: '/orders/get',
				body: { userId: prop.userId },
				method: 'POST',
				Authorization: `Bearer ${prop.token}`,
			}),
		}),
		getSingleOrder: builder.query({
			query: (id) => `/orders/${id}`,
		}),
		// create order
		createOrder: builder.mutation({
			query: (body) => ({
				url: '/orders/get',
				method: 'POST',
				body,
			}),
		}),
		// create order
		updateOrder: builder.mutation({
			query: (body) => ({
				url: '/orders/create',
				method: 'POST',
				body,
			}),
		}),
		// delete order
		deleteOrder: builder.mutation({
			query: (body) => ({
				url: '/orders/create',
				method: 'DELETE',
				body,
			}),
		}),
	}),
});

export const {
	useSignupMutation,
	useLoginMutation,
	useCreateProductMutation,
	useDeleteProductMutation,
	useUpdateProductMutation,
	useAddToCartMutation,
	useRemoveFromCartMutation,
	useIncreaseCartProductMutation,
	useDecreaseCartProductMutation,
	useGetPaymentOptionQuery,
	useGetOrderQuery,
	useGetSingleOrderQuery,
	useCreateOrderMutation,
	useDeleteOrderMutation,
	useUpdateOrderMutation,
} = appApi;

export default appApi;
