import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authReducer from './reducers/auth';
import expensesReducer from './reducers/expenses';

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    auth: authReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch