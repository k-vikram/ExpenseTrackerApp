import React, { useState } from 'react'
import { useAppDispatch } from '../../store/hooks'
import {
    RefreshIcon
} from '@heroicons/react/outline'

interface IReportDates {
    startDate?: Date | string | number;
    endDate?: Date | string | number;
}

const Reports = (): JSX.Element | null => {
    const [reportDates, setReportDates] = useState<IReportDates>({})
    const dispatch = useAppDispatch();

    const constructReportsForDates: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<SubmitEvent>) => {
        e.preventDefault();
        const formObjects = e.target as Record<string, any>;
        const startDate = (formObjects["1"] as HTMLInputElement)?.value;
        const endDate = (formObjects["2"] as HTMLInputElement)?.value;

        setReportDates({ startDate, endDate });
    }

    return <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col sm:flex-row items-center justify-between ">
            <h1 className="text-2xl font-semibold text-gray-900">Expenditure Reports</h1>
            <div className='flex items-center justify-between'>
                <div className="h-6 w-6 hover:text-indigo-600 hover:cursor-pointer mx-1"
                    onClick={() => null}>
                    <RefreshIcon aria-hidden="true" />
                </div>
            </div>

        </div>
        <form onSubmit={constructReportsForDates}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="py-4">
                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-7">
                        <div className="sm:col-span-3">
                            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                                Start Date
                            </label>
                            <div className="mt-1">
                                <input
                                    required
                                    type="date"
                                    name="startDate"
                                    id="startDate"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                                End Date
                            </label>
                            <div className="mt-1">
                                <input
                                    required
                                    type="date"
                                    name="endDate"
                                    id="endDate"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-1 flex flex-col items-center justify-end">

                            <button
                                type="submit"
                                className=" bg-indigo-500 text-white py-3 px-3 border border-gray-300 rounded-md 
                                shadow-sm text-sm leading-4 font-normal hover:bg-indigo-400
                                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
                            >
                                Fetch Reports
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
}

export default Reports;