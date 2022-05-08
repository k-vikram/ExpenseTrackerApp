import { createSlice } from '@reduxjs/toolkit';
import { confirmSignUp, resendVerificationCode, signIn, signOut, signUpNewUser } from '../../actionCreators/auth';
import { AuthState } from '../storeTypes';


const initialState: AuthState = {
    token: undefined,
    userInfo: {},
    signUpState: {
        loading: 'idle',
        error: null,
        entities: {}
    },
    resendState: {
        loading: 'idle',
        error: null,
        entities: {}
    },
    confirmSignUpState: {
        loading: 'idle',
        error: null,
        entities: {}
    },
    signInState: {
        loading: 'idle',
        error: null,
        entities: {}
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(signUpNewUser.pending, (state) => {
            state.signUpState.loading = 'pending';
            state.signUpState.error = null;
        });
        builder.addCase(signUpNewUser.fulfilled, (state, { payload }) => {
            state.signUpState.entities = payload as {};
            state.signUpState.loading = initialState.signUpState.loading;
        });
        builder.addCase(signUpNewUser.rejected, (state, { payload }) => {
            state.signUpState.entities = initialState.signUpState.entities;
            state.signUpState.loading = initialState.signUpState.loading;
            state.signUpState.error = typeof payload === 'string' ? payload : 'Unexpected Error. Kindly Report';
        });
        builder.addCase(resendVerificationCode.pending, (state) => {
            state.resendState.loading = 'pending';
            state.resendState.error = null;
        });
        builder.addCase(resendVerificationCode.fulfilled, (state, { payload }) => {
            state.resendState.entities = payload;
            state.resendState.loading = initialState.resendState.loading;
        });
        builder.addCase(resendVerificationCode.rejected, (state, { payload }) => {
            state.resendState.entities = initialState.resendState.entities;
            state.resendState.loading = initialState.resendState.loading;
            state.resendState.error =  typeof payload === 'string' ? payload : 'Unexpected Error. Kindly Report';
        });
        builder.addCase(confirmSignUp.pending, (state) => {
            state.confirmSignUpState.loading = 'pending';
            state.confirmSignUpState.error = null;
        });
        builder.addCase(confirmSignUp.fulfilled, (state, { payload }) => {
            state.signUpState.entities = initialState.signUpState.entities;
            state.resendState.entities = initialState.resendState.entities;

            state.confirmSignUpState.entities = payload;
            state.confirmSignUpState.loading = initialState.resendState.loading;
        });
        builder.addCase(confirmSignUp.rejected, (state, { payload }) => {
            state.confirmSignUpState.entities = initialState.resendState.entities;
            state.confirmSignUpState.loading = initialState.resendState.loading;
            state.confirmSignUpState.error =  typeof payload === 'string' ? payload : 'Unexpected Error. Kindly Report';
        });
        builder.addCase(signIn.pending, (state) => {
            state.signInState.loading = 'pending';
            state.signInState.error = null;
        });
        builder.addCase(signIn.fulfilled, (state, { payload }) => {
            state.signInState.entities = payload as {};
            state.signInState.loading = initialState.signInState.loading;
        });
        builder.addCase(signIn.rejected, (state, { payload }) => {
            state.signInState.entities = initialState.signInState.entities;
            state.signInState.loading = initialState.signInState.loading;
            state.signInState.error =  typeof payload === 'string' ? payload : 'Unexpected Error. Kindly Report';
        }),
        builder.addCase(signOut.pending, (state) => {
            state.signInState.loading = 'pending';
            state.signInState.error = null;
        });
        builder.addCase(signOut.fulfilled, (state, { payload }) => {
            state.signInState.entities = initialState.signInState.entities;
            state.signInState.loading = initialState.signInState.loading;
            state = initialState;
            payload.navigate?.('/');
        });
        builder.addCase(signOut.rejected, (state, { payload }) => {
            state.signInState.loading = initialState.signInState.loading;
            state.signInState.error =  typeof payload === 'string' ? payload : 'Unexpected Error. Kindly Report';
        })

    }
})

export default authSlice.reducer;