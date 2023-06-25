import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: false,
};

export const loadingSlice = createSlice({
	name: 'open',
	initialState,
	reducers: {
		loadingAction: (state, action) => {
			state.value = action.payload;
		},
	},
});

export const { loadingAction } = loadingSlice.actions;

export default loadingSlice.reducer;
