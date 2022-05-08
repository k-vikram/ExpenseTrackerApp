import React from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../actionCreators/auth";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { AuthState } from "../../store/storeTypes";

// import { justSignUp } from "../../actionCreators/auth";

const LoginPage = (): React.ReactElement | null => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const { signInState } = useAppSelector(MapStateToPropsHook);
  const { loading: signInLoading, error: signInError, entities: signInEntities } = signInState;

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formObjects = e.target as Record<string, any>;
    const username = (formObjects["0"] as HTMLInputElement)?.value;
    const password = (formObjects["1"] as HTMLInputElement)?.value;

    dispatch(signIn({ username, password, navigate }));
  }
  

  // console.log('fetching dude in login...')
  //  justSignUp({ username: 'vtgtyc', password: '123456' })
  return <>
    <h2 className="my-6 text-3xl font-extrabold text-gray-900">Sign In</h2>
    <form className="space-y-6" onSubmit={onSubmit}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <div className="mt-1">
          <input
            id="username"
            name="username"
            type="text"
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">

        <div className="text-sm">
          <a href="/auth/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            New here? Sign Up
          </a>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium
           text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={signInLoading === 'pending'}
        >
          {signInLoading === 'pending' ? 'Signing In...' : 'Sign In'}
        </button>
      </div>
      {signInError && <div>
        <small className="text-red-500 ">{signInError}</small>
      </div>}
    </form>
  </>

}

const MapStateToPropsHook = (state: {
  auth: AuthState;
}) => ({
  signInState: state.auth.signInState,
})

export default LoginPage;