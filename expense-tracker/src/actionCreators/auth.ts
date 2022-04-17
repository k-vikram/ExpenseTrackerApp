import Amplify, { Auth } from "aws-amplify";
import { RootState, AppDispatch} from '../store/store';
import CONFIG from '../constants/constants.json';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CognitoUser, SignUpParams } from "@aws-amplify/auth";

Amplify.configure({
    Auth: {
        // REQUIRED - Amazon Cognito Region
        region: CONFIG.CognitoConstants.region,
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: CONFIG.CognitoConstants.userPool,
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: CONFIG.CognitoConstants.clientId
    }
});

interface ISignUpAttributes{
  username: string;
  password: string;
  email?: string;
}
type rejectType =  string;

export const signUpNewUser =
  async ({ username, password, email = "" }: ISignUpAttributes) => {
      try {
          const signUpRequestBody: SignUpParams = {
            username,
            password
        };
        if(email){
          signUpRequestBody.attributes = {
            email
          }
        }
          const { user } = await Auth.signUp(signUpRequestBody);
          // TO DO: remove it once sure
          console.log(user);
          return user as CognitoUser;
          
      } catch (error) {
          console.log('error signing up:', error);
          return 'error signing up:';
      }
  }


// export const login = ( username: string, password: string ): RootState =>
//   async ( dispatch: AppDispatch<any>, getState: any ): Promise<any> => {
//     try {

//       dispatch( updateAuth({
//         loginStatus: authActions.LOGIN_PROCESSING,
//         loginErrorMsg: undefined
//       }));

//       const user = await Auth.signIn( username, password );

//       const { auth : { enforceMFA }, globalConfig:  { permanentPaths } } = getState();

//       if ( user.challengeName === "NEW_PASSWORD_REQUIRED" ) {
//         navigate( permanentPaths.resetPassword.path );
//         return;
//       } 

//       const mfaType = await Auth.getPreferredMFA( user );
      
//       dispatch( updateAuth(
//         { token: user?.signInUserSession.idToken.jwtToken }));

//       await dispatch( initialUserSetup( username ));

//       dispatch( updateAuth({ sessionActive: true,
//         loginStatus: authActions.LOGIN_SUCCESS,
//         username }));

//     } catch ( error ) {
//       dispatch( updateAuth({
//         loginErrorMsg: ( error as Error ).message || JSON.stringify( error ),
//         loginStatus: authActions.LOGIN_FAILURE
//       }));
//     }
//   };