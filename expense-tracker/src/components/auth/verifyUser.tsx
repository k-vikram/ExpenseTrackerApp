import React, { ReactElement } from "react";

const VerifyUserPage = (): ReactElement | null => {
    return <>
        <h2 className="my-6 text-3xl font-extrabold text-gray-900">Verify OTP</h2>
        <form action="#" method="POST" className="space-y-6">
            <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                    OTP
                </label>
                <div className="mt-1">
                    <input
                        id="otp"
                        name="otp"
                        type="number"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none 
                    focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
            </div>

            <div className="flex items-center justify-between">

                <div className="text-sm">
                    <a href="/auth/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Lost your way? Sign Up
                    </a>
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
         bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Verify
                </button>
            </div>
        </form>
    </>
}

export default VerifyUserPage;