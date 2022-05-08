import React, { useState, useEffect, useMemo } from 'react'
import { PieChart, Pie, Tooltip, ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar } from 'recharts';

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
    RefreshIcon
} from '@heroicons/react/outline'
import { ExpensesState } from '../../store/storeTypes'
import { getAllExpenses } from '../../actionCreators/expenses'
import { formContainer } from 'aws-amplify';


interface IReportDates {
    startDate?: string;
    endDate?: string;
}

const Reports = (): JSX.Element | null => {
    const [reportDates, setReportDates] = useState<IReportDates>({});

    const dispatch = useAppDispatch();
    const { getExpensesState } = useAppSelector(MapStateToPropsHook);
    const { loading: loadingExpenses, error, entities: expensesList } = getExpensesState;

    useEffect(() => {
        if (!expensesList || expensesList.length === 0) {
            dispatch(getAllExpenses({}));
        }
    }, [dispatch, expensesList])

    const constructReportsForDates: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formObjects = e.target as Record<string, any>;
        const startDate = (formObjects["0"] as HTMLInputElement)?.value;
        const endDate = (formObjects["1"] as HTMLInputElement)?.value;

        setReportDates({ startDate, endDate });
    }

    const dateWindowExpenses = useMemo(() => expensesList.
        filter(curr => {
            const { startDate, endDate } = reportDates;
            if (startDate && endDate) {
                return new Date(curr.date.S) > new Date(startDate)
                    && new Date(curr.date.S) < new Date(endDate)
            } else { return false; }
        }), [expensesList, reportDates])


    const DataForPie = useMemo(() => {
        const groupWiseMap = dateWindowExpenses.reduce((acc, curr) => {
            acc[curr.expenseType.S] = acc[curr.expenseType.S] ?
                acc[curr.expenseType.S] + parseInt(curr.expense.N, 10)
                : parseInt(curr.expense.N, 10);
            return acc;
        }, {} as { [k: string]: number });

        return Object.entries(groupWiseMap).map(([eachGroupName, eachGroupValue]) =>
            ({ name: eachGroupName, value: eachGroupValue }));
    }, [dateWindowExpenses])

    const DataForBar = useMemo(() => {
        const dateWiseMap = dateWindowExpenses.reduce((acc, curr) => {
            acc[curr.date.S] = acc[curr.date.S] ?
                acc[curr.date.S] + parseInt(curr.expense.N, 10)
                : parseInt(curr.expense.N, 10);
            return acc;
        }, {} as { [k: string]: number });

        return Object.keys(dateWiseMap)
            .sort((a, b) => new Date(a) < new Date(b) ? -1 : new Date(a) > new Date(b) ? 1 : 0)
            .map((eachDate) =>
                ({ name: eachDate.split('-').reverse().join('/'), amt: dateWiseMap[eachDate] }));
    }, [dateWindowExpenses])

    console.log(expensesList, dateWindowExpenses, DataForBar, DataForPie)

    return <>
        <div className="py-6 m-2 border-2 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col sm:flex-row items-center justify-between ">
                <h1 className="text-2xl font-semibold text-gray-900">Expenditure Reports</h1>
                <div className='flex items-center justify-between'>
                    <div className="h-6 w-6 hover:text-indigo-600 hover:cursor-pointer mx-1"
                        onClick={() => {
                            dispatch(getAllExpenses({}));
                            setReportDates({});
                            (document.getElementById('dateFilterForm') as HTMLFormElement).reset();
                        }}>
                        <RefreshIcon aria-hidden="true" />
                    </div>
                </div>

            </div>
            <form id="dateFilterForm" onSubmit={constructReportsForDates}>
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
                                    className=" bg-indigo-600 text-white py-3 px-3 border border-gray-300 rounded-md 
                                shadow-sm text-sm leading-4 font-normal hover:bg-indigo-500
                                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Fetch Reports
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        {(reportDates.startDate && reportDates.endDate) ?
            dateWindowExpenses.length > 0 ?
                <div className='flex flex-col sm:flex-row flex-1 justify-evenly items-center py-6 m-2'>
                    <div className="p-4 m-2 border-2 shadow-md min-h-[600px] items-start w-full sm:w-1/2">
                        <h5 className="my-2 text-xl font-semibold text-gray-900">Typewise Expenditure</h5>
                        <PieChart width={1000} height={400}>
                            <Pie
                                dataKey="value"
                                isAnimationActive={false}
                                data={DataForPie}
                                cx={200}
                                cy={200}
                                outerRadius={80}
                                fill="#4338ca"
                                label
                            />
                            <Tooltip />
                        </PieChart>
                    </div>
                    <div className="p-4 m-2 border-2 shadow-md min-h-[600px] overflow-scroll items-start w-full sm:w-1/2">
                        <h5 className="my-2 text-xl font-semibold text-gray-900">Datewise Expenditure</h5>
                        {/* <ResponsiveContainer width="100%" height="100%"> */}
                        <BarChart
                            width={500}
                            height={350}
                            data={DataForBar}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="amt" fill="#4338ca" />
                        </BarChart>
                        {/* </ResponsiveContainer> */}

                    </div>
                </div>
                : <div className="p-4 m-2 border-2 shadow-md h-auto items-start w-full ">
                    <h5 className="my-2 text-base font-semibold text-gray-900">No Records found for this range !</h5>
                </div>
            : <div className="p-4 m-2 border-2 shadow-md h-auto items-start w-full ">
                <h5 className="my-2 text-base font-semibold text-gray-900">Please Apply Date Filter for Generating Reports</h5>
            </div>
        }
    </>
}

const MapStateToPropsHook = (state: {
    expenses: ExpensesState;
}) => ({
    getExpensesState: state.expenses.getExpensesState,
})

export default Reports;