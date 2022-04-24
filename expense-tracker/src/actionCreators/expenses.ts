import CONFIG from '../constants/constants.json';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";

export interface IExpense {
  type: string;
  date: string;
  amount: string;
  id: string;
}

export interface INewExpenseAttributes {
  type: string;
  date: string;
  amount: string;
  id: string;
  navigate?: NavigateFunction;
  callback? : () => void
}

export const addNewExpense = createAsyncThunk(
  'expenses/addNewExpense',
  async ({ type, date, amount, id, callback }: INewExpenseAttributes, thunkApi) => {
    try {
      const addNewExpenseRequestBody = {
        type, date, amount, id
      };

      const addNewExpenseResponse = await fetch(CONFIG.BaseUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'mode': 'no-cors'
        },
        body: JSON.stringify(addNewExpenseRequestBody)
      });

      const usefulInfo = await addNewExpenseResponse.json();
      callback?.();

      return usefulInfo as unknown;

    } catch (error) {
      console.log('error creating a new expense', error);
      return thunkApi.rejectWithValue((error as Error).message)
    }
  }
)

export const getAllExpenses = createAsyncThunk(
  'expenses/getAllExpenses',
  async ({}, thunkApi) => {
    try {
     
      const addNewExpenseResponse = await fetch(CONFIG.BaseUrl);
      const allExpenses: IExpense[] = await addNewExpenseResponse.json();

      return allExpenses;

    } catch (error) {
      console.log('error fetching all expenses', error);
      return thunkApi.rejectWithValue((error as Error).message)
    }
  }
)

export const deleteAnExpense = createAsyncThunk(
  'expenses/deleteAnExpense',
  async ({ id, callback } : Partial<INewExpenseAttributes>, thunkApi) => {
    try {
      const deleteAnExpenseRequestBody = {
        expenseId: id
      };

      const deleteAnExpenseResponse = await fetch(CONFIG.BaseUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deleteAnExpenseRequestBody)
      });

      const usefulInfo = await deleteAnExpenseResponse.json();
      callback?.();

      return usefulInfo as unknown;

    } catch (error) {
      console.log(`error deleting existing expense with expenseId : ${id}`, error);
      return thunkApi.rejectWithValue((error as Error).message)
    }
  }
)