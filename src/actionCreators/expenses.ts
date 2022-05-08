import CONFIG from '../constants/constants.json';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import { ISignInResult } from './auth';

export interface IExpense {
  date: { S: string };
  expense: { N: string };
  expenseType: { S: string };
  expenseId: { N: string };
}

export interface INewExpenseAttributes {
  type: string;
  date: string;
  amount: string;
  id: string | number;
  navigate?: NavigateFunction;
  callback? : () => void
}

export const addNewExpense = createAsyncThunk(
  'expenses/addNewExpense',
  async ({ type, date, amount, id, callback }: INewExpenseAttributes, thunkApi) => {
    try {
      const authToken = ((thunkApi.getState() as any).auth.signInState.entities.loggedInUser as ISignInResult["loggedInUser"])?.accessToken;
      const customeHeaders: Record<string,any> =  {
        'Content-Type': 'application/json',
      }
      if(authToken) { customeHeaders.Authorization = '' + authToken; }

      const addNewExpenseRequestBody = {
        type, date, amount, id
      };
     
      const addNewExpenseResponse = await fetch(CONFIG.BaseUrl, {
        method: 'PUT',
       //  credentials: 'include',
        headers: customeHeaders,
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
  async ({}: {}, thunkApi) => {
    try {
      const authToken = ((thunkApi.getState() as any).auth.signInState.entities.loggedInUser as ISignInResult["loggedInUser"])?.accessToken;
      const customeHeaders: Record<string,any> =  {
        'Content-Type': 'application/json',
      }
      if(authToken) { customeHeaders.Authorization = '' + authToken; }

      const addNewExpenseResponse = await fetch(CONFIG.BaseUrl, {
        method: 'GET',
       //  credentials: 'include',
        headers: customeHeaders
      });
      const allExpenses = await addNewExpenseResponse.json();

      return allExpenses?.Items || [] as IExpense[];

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

      const authToken = ((thunkApi.getState() as any).auth.signInState.entities.loggedInUser as ISignInResult["loggedInUser"])?.accessToken;
      const customeHeaders: Record<string,any> =  {
        'Content-Type': 'application/json',
      }
      if(authToken) { customeHeaders.Authorization = '' + authToken; }

      const deleteAnExpenseRequestBody = {
        expenseId: id
      };

      const deleteAnExpenseResponse = await fetch(CONFIG.BaseUrl, {
        method: 'DELETE',
       //  credentials: 'include',
        headers: customeHeaders,
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