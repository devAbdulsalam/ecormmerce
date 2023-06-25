import { createSlice } from '@reduxjs/toolkit';
import appApi from './../../fetchers/appApi';

const initialState = [];

export const orderSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {
		getSingleOrder: (state, action) => {
			return state.find((item) => item._id === action.payload.id);
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			appApi.endpoints.createOrder.matchFulfilled,
			(_, { payload }) => payload
		);
		builder.addMatcher(
			appApi.endpoints.getOrder.matchFulfilled,
			(_, { payload }) => payload
		);
		builder.addMatcher(
			appApi.endpoints.updateOrder.matchFulfilled,
			(_, { payload }) => payload
		);
		builder.addMatcher(
			appApi.endpoints.deleteOrder.matchFulfilled,
			(_, { payload }) => payload
		);
	},
});

export const { getSingleOrder } = orderSlice.actions;
export default orderSlice.reducer;
