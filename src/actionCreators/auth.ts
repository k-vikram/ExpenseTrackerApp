import Amplify, { Auth } from "aws-amplify";
import CONFIG from '../constants/constants.json';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CognitoUser, SignUpParams } from "@aws-amplify/auth";
import { NavigateFunction } from "react-router-dom";


Amplify.configure({
  Auth: {
    region: CONFIG.CognitoConstants.region,
    userPoolId: CONFIG.CognitoConstants.userPool,
    userPoolWebClientId: CONFIG.CognitoConstants.clientId
  }
});

export interface ISignUpAttributes {
  username: string;
  password: string;
  email?: string;
  code?: string;
  navigate: NavigateFunction;
}

export const signUpNewUser = createAsyncThunk(
  'auth/signUpNewUser',
  async ({ username, password, email = "", navigate }: ISignUpAttributes, thunkApi) => {
    try {
      const signUpRequestBody: SignUpParams = {
        username,
        password
      };
      if (email) {
        signUpRequestBody.attributes = {
          email
        }
      }
      const { user } = await Auth.signUp(signUpRequestBody);
      navigate('/auth/verify');
      return user as CognitoUser;

    } catch (error) {
      console.log('error signing up:', error);
      return thunkApi.rejectWithValue((error as Error).message)
    }
  }
)

export const confirmSignUp = createAsyncThunk(
  'auth/confirmSignUp',
  async ({ username, code, navigate }: { username: string, code: string, navigate: any }, thunkApi) => {
    try {
      await Auth.confirmSignUp(username, code);
      navigate('/auth/login');
      return { userConfirmed: true, confirmedUsername: username } as { userConfirmed: boolean, confirmedUsername: string };
    } catch (error) {
      console.log('error confirming sign up', error);
      return thunkApi.rejectWithValue((error as Error).message)
    }
  }
)

export const resendVerificationCode = createAsyncThunk(
  'auth/resendVerificationCode',
  async ({ username }: { username: string }, thunkApi) => {
    try {
      await Auth.resendSignUp(username);
      console.log(`Code resent successfully to ${username}`);
      return { resentCodeTo: username } as { resentCodeTo: string };
    } catch (error) {
      console.log('error resending code: ', error);
      return thunkApi.rejectWithValue((error as Error).message)
    }
  }
)

export interface ISignInResult {
  loggedInUser: {
    username: string,
    accessToken: string,
    refreshToken: string,
    idToken: string
  }
}

export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ username, password, navigate }: ISignUpAttributes, thunkApi) => {
    try {
      const { username: signedInUsername, signInUserSession } = await Auth.signIn(username, password);
      navigate('/home');
      return {
        loggedInUser: {
          username: signedInUsername,
          accessToken: signInUserSession.accessToken.jwtToken,
          refreshToken: signInUserSession.refreshToken.token,
          idToken: signInUserSession.idToken.jwtToken
        }
      } as ISignInResult;

    } catch (error) {
      console.log('error signing in', error);
      return thunkApi.rejectWithValue((error as Error).message)
    }
  }
)


export const signOut = createAsyncThunk(
  'auth/signOut',
  async ({ navigate }: { navigate: NavigateFunction }, thunkApi) => {
    try {
      await Auth.signOut();
      return { navigate } as { navigate?: NavigateFunction };

    } catch (error) {
      console.log('error signing in', error);
      return thunkApi.rejectWithValue((error as Error).message)
    }
  }
)