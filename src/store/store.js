import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './reducers/cartSlice';
import { isOpenReducer } from './reducers/isOpenSlice';
import { searchReducer } from './reducers/searchSlice';
import { shoppingCardReducer } from './reducers/shoppingCardSlice';
import { sidebarReducer } from './reducers/sidebarSlice';
import { authReducer } from './reducers/userSlice';
import appApi from './../fetchers/appApi';

const reducer = {
	shoppingCard: shoppingCardReducer,
	sidebar: sidebarReducer,
	cart: cartReducer,
	search: searchReducer,
	isOpen: isOpenReducer,
	user: authReducer, // Add the authReducer
	[appApi.reducerPath]: appApi.reducer,
};

const store = configureStore({
	reducer,
	devTools: true,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(appApi.middleware),
});

export default store;
