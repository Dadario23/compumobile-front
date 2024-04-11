import { configureStore } from '@reduxjs/toolkit'

import userReducer from './user'
import allUsersReducer from './allUsers'

const store = configureStore({
	reducer: {
		user: userReducer,
		allUsers: allUsersReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store
