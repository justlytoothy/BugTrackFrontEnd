import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import projectReducer from '../features/projects/projectSlice';
import { logoutUser } from '../features/auth/authSlice';
import ticketReducer from '../features/tickets/ticketSlice';
import commentReducer from '../features/comments/commentSlice';
//import exampleReducer from './exampleReducer

const store = configureStore({
	reducer: {
		auth: authReducer,
		project: projectReducer,
		ticket: ticketReducer,
		comment: commentReducer,
	},
});

export const logout = () => {
	store.dispatch(logoutUser);
};

export default store;
