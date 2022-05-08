import React, { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { signUpNewUser } from "../../actionCreators/auth";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { AuthState } from "../../store/reducers/auth";


const RegisterPage = (): ReactElement | null => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { signUpState } = useAppSelector(MapStateToPropsHook);
    const { loading: signUpLoading, error: signUpError, entities: signUpEntities } = signUpState;

    const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const formObjects = e.target as Record<string, any>;
        const email = (formObjects["0"] as HTMLInputElement)?.value;
        const username = (formObjects["1"] as HTMLInputElement)?.value;
        const password = (formObjects["2"] as HTMLInputElement)?.value;

        dispatch(signUpNewUser({ username, password, email, navigate }));
    }

    const validatePasswords: React.ChangeEventHandler = (e) => {
        e.preventDefault();
        const enteredPassword = (document.getElementById('password') as HTMLInputElement)?.value;
        const confirmPassword = (e.target as HTMLInputElement).value;
        if (enteredPassword.length > 0 && enteredPassword !== confirmPassword) {
            (e.target as HTMLInputElement).setCustomValidity("Passwords Don't Match");
        } else {
            (e.target as HTMLInputElement).setCustomValidity("");
        }
    }

    return <>
        <h2 className="my-6 text-3xl font-extrabold text-gray-900">Sign Up</h2>
        <form className="space-y-6" onSubmit={onSubmit}>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                </label>
                <div className="mt-1">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    User Name
                </label>
                <div className="mt-1">
                    <input
                        id="username"
                        name="username"
                        type="username"
                        autoComplete="username"
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
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
            </div>

            <div className="space-y-1">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                </label>
                <div className="mt-1">
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        required
                        onChange={validatePasswords}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
            </div>

            <div className="flex items-center justify-between">

                <div className="text-sm">
                    <a href="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Having an Id? Sign In
                    </a>
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium 
                    text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={signUpLoading === 'pending'}
                >
                    Sign in
                </button>&nbsp;
            </div>
            {signUpError && <div>
                <small className="text-red-500 ">{signUpError}</small>
            </div>}
        </form>
    </>
}

const MapStateToPropsHook = (state: {
    auth: AuthState;
}) => ({
    signUpState: state.auth.signUpState
})

export default RegisterPage;