import React from "react";
import { Outlet } from "react-router-dom";
import ETIcon from '../../assets/etIcon.jpeg'
import LandingImage from '../../assets/expenseLandingPage.jpg'

interface IAuthLayoutProps {
    children?: React.ReactNode
}

const AuthLayoutPage = ({
    children
}: IAuthLayoutProps): React.ReactElement | null => {
    return <div className="h-[100vh] bg-white">
        <div className="min-h-full flex">
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div>
                        <img
                            className="h-12 w-auto"
                            src={ETIcon}
                            alt="Pocket_Check_Icon"
                        />
                        <h1 className="my-8 text-4xl font-extrabold text-indigo-600">Pocket Check</h1>
                    </div>


                    <div className="mt-8">
                        <div className="mt-6">
                            {children ?? <Outlet /> ?? ""}
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block relative w-0 flex-1">
                <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src={LandingImage}
                    alt=""
                />
            </div>
        </div>
    </div>

}

export default AuthLayoutPage;