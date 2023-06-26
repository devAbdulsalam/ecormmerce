import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: false,
};

export const paymentSlice = createSlice({
	name: 'payment',
	initialState,
	reducers: {
		paymentAction: (state, action) => {
			state.value = action.payload;
		},
	},
});

export const { paymentAction } = paymentSlice.actions;

export default paymentSlice.reducer;
