import React, { ReactElement, useEffect } from "react";
import { CognitoUser } from "@aws-amplify/auth";

import { confirmSignUp, resendVerificationCode } from "../../actionCreators/auth";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { AuthState } from "../../store/reducers/auth";
import { useNavigate } from "react-router-dom";


const VerifyUserPage = (): ReactElement | null => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const { signUpState, resendState, confirmSignUpState } = useAppSelector(MapStateToPropsHook);
    const { loading: signUpLoading ,error: signUpError, entities: signUpEntities } = signUpState;
    const { loading: resendLoading, error: resendError , entities: resendEntities } = resendState;
    const { loading: confirmSignUpLoading, error: confirmSignUpError, entities: confirmSignUpEntities } = confirmSignUpState;
    
    useEffect(() => {
        if (!signUpEntities?.username ) {
            navigate('/')
        }
    }, [])

    const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const formObjects = e.target as Record<string, any>;
        const otpCode = (formObjects["0"] as HTMLInputElement)?.value;

        dispatch(confirmSignUp({ username: signUpEntities?.username as string || "", code: otpCode, navigate }));
    }


    return <>
        <h2 className="my-6 text-3xl font-extrabold text-gray-900">Verify User</h2>
        <form className="space-y-6" onSubmit={onSubmit}>
            <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                    OTP
                </label>
                <div className="mt-1">
                    <input
                        id="otp"
                        name="otp"
                        type="number"
                        maxLength={6}
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none 
                    focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        disabled={resendLoading === 'pending'}
                    />
                </div>
            </div>

            <div className="flex items-center justify-between">

                <div className="text-sm">
                    <button
                        type="button"
                        onClick={() => dispatch(resendVerificationCode({ username: (signUpEntities?.user as CognitoUser)?.getUsername() || "" }))}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                        disabled={resendLoading === 'pending'}
                    >
                        {resendLoading === 'pending' ? 'Resending OTP' : 'Resend OTP'}
                    </button>
                </div>
                {resendError && <div>
                <small className="text-red-500 ">{resendError}</small>
            </div>}
            </div>

            <div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
                     bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={resendLoading === 'pending' || confirmSignUpLoading === 'loading'}
                >
                    Verify
                </button>
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
    signUpState: state.auth.signUpState,
    resendState: state.auth.resendState,
    confirmSignUpState: state.auth.confirmSignUpState
})

export default VerifyUserPage;