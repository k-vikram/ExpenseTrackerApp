import { createSlice } from '@reduxjs/toolkit';
import { signOut } from '../../actionCreators/auth';
import { addNewExpense, deleteAnExpense, getAllExpenses } from '../../actionCreators/expenses';
import { ExpensesState } from '../storeTypes';


const initialState: ExpensesState = {
    newExpenseState: {
        loading: 'idle',
        error: null,
        entities: {}
    },
    getExpensesState: {
        loading: 'idle',
        error: null,
        entities: []
    },
    deleteExpenseState: {
        loading: 'idle',
        error: null,
        entities: {}
    }
}

export const expensesSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(addNewExpense.pending, (state) => {
            state.newExpenseState.loading = 'pending';
            state.newExpenseState.error = null;
        });
        builder.addCase(addNewExpense.fulfilled, (state, { payload }) => {
            state.newExpenseState.entities = payload as {};
            state.newExpenseState.loading = initialState.newExpenseState.loading;
        });
        builder.addCase(addNewExpense.rejected, (state, { payload }) => {
            state.newExpenseState.entities = initialState.newExpenseState.entities;
            state.newExpenseState.loading = initialState.newExpenseState.loading;
            state.newExpenseState.error = typeof payload === 'string' ? payload : 'Unexpected Error. Kindly Report';
        });
        builder.addCase(getAllExpenses.pending, (state) => {
            state.getExpensesState.loading = 'pending';
            state.getExpensesState.error = null;
        });
        builder.addCase(getAllExpenses.fulfilled, (state, { payload }) => {
            state.getExpensesState.entities = payload;
            state.getExpensesState.loading = initialState.getExpensesState.loading;
        });
        builder.addCase(getAllExpenses.rejected, (state, { payload }) => {
            state.getExpensesState.entities = initialState.getExpensesState.entities;
            state.getExpensesState.loading = initialState.getExpensesState.loading;
            state.getExpensesState.error =  typeof payload === 'string' ? payload : 'Unexpected Error. Kindly Report';
        });
        builder.addCase(deleteAnExpense.pending, (state) => {
            state.deleteExpenseState.loading = 'pending';
            state.deleteExpenseState.error = null;
        });
        builder.addCase(deleteAnExpense.fulfilled, (state, { payload }) => {
            state.deleteExpenseState.entities = initialState.deleteExpenseState.entities;
            state.deleteExpenseState.entities = initialState.deleteExpenseState.entities;

            state.deleteExpenseState.entities = payload as {};
            state.deleteExpenseState.loading = initialState.deleteExpenseState.loading;
        });
        builder.addCase(deleteAnExpense.rejected, (state, { payload }) => {
            state.deleteExpenseState.entities = initialState.deleteExpenseState.entities;
            state.deleteExpenseState.loading = initialState.deleteExpenseState.loading;
            state.deleteExpenseState.error =  typeof payload === 'string' ? payload : 'Unexpected Error. Kindly Report';
        });
        builder.addCase(signOut.fulfilled, (state) => {
            state.getExpensesState.entities = initialState.getExpensesState.entities;
        });
    }
})
;

export default expensesSlice.reducer;