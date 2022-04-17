import {  createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signUpNewUser } from '../../actionCreators/auth';

export type SideEffectLoadingStatus = 'idle' | 'loading' | 'pending' | 'finished' | 'error';
export type SideEffectErrorStatus = string | null;
export type SideEffectInitialStates = Record<string, unknown> | any[];

export interface SideEffectState<T> {
    loading: SideEffectLoadingStatus,
    error: SideEffectErrorStatus,
    entities: unknown
}

export interface AuthState {
    token?: string;
    signUpState: SideEffectState<Record<string, unknown>>;
    userInfo: unknown;
}


const initialState: AuthState = {
    token: undefined,
    userInfo: {},
    signUpState: {
        loading: 'idle',
        error: null,
        entities: {}
    }
}

type PayloadType = { [key: string]: unknown };


interface ISignUpAttributes{
    username: string;
    password: string;
    email?: string;
  }
  
export const signUp = createAsyncThunk(
    'auth/signUpNewUser',
    async (signUpParams: ISignUpAttributes, thunkApi) => {
        return await signUpNewUser(signUpParams)
    }
  )


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    // extraReducers: (builder) => {
    //     // builder.addCase(signUp.pending, (state) => {
    //     //     state.signUpState.loading = 'pending';
    //     //     state.signUpState.error = null;
    //     // });
    //     // builder.addCase(signUp.fulfilled, (state, {payload}) => {
    //     //     state.signUpState.entities = payload;
    //     //      state.signUpState.loading = initialState.signUpState.loading;
    //     // })
    //     // builder.addCase(signUp.rejected, (state, {payload}) => {
    //     //     state.signUpState.entities = initialState.signUpState.entities;
    //     //     state.signUpState.loading = initialState.signUpState.loading;
    //     //     state.signUpState.error = typeof payload === 'string' ? payload : 'Unexpected Error. Kindly Report';
    //     // });
    // }
})

// Action creators are generated for each case reducer function
// export const { login, register, verifyUser } = authSlice.actions

export default authSlice.reducer;
