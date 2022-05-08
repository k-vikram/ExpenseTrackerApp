import { useEffect, useMemo, Fragment } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { deleteAnExpense, getAllExpenses, IExpense } from '../../actionCreators/expenses'
import { ExpensesState } from '../../store/storeTypes';
import {
    CalendarIcon, DotsHorizontalIcon,
    TrashIcon
} from '@heroicons/react/solid'
import { Menu } from '@headlessui/react';


interface IDateSortedExpenses {
    [date: string]: IExpense[];
}

const ListAllExpenses = (): JSX.Element | null => {

    const { getExpensesState } = useAppSelector(mapStateToHook);
    const { loading: loadingExpenses, error, entities: expensesList } = getExpensesState;

    const dispatch = useAppDispatch();

    const dateSortedExpenses = useMemo(() => expensesList.reduce((acc, eachExpense) => {
        if (acc[eachExpense.date.S]) {
            acc[eachExpense.date.S].push(eachExpense);
        } else {
            acc[eachExpense.date.S] = [eachExpense]
        }
        return acc;
    }, {} as IDateSortedExpenses), [expensesList]);

    const sortedDatesList = useMemo(() => Object.keys(dateSortedExpenses)
        .sort((a, b) => b.localeCompare(a))
        , [dateSortedExpenses]) || [];

    useEffect(() => {
        dispatch(getAllExpenses({}));
    }, [])

    const deleteExpense = (expenseId: string) => {
        dispatch(deleteAnExpense({ id: expenseId, callback: () => dispatch(getAllExpenses({})) }));
    }

    return (
        loadingExpenses === 'pending' ? <ListSkeleton broad={4} inner={3}/> : <div>
            < nav className="h-full overflow-y-auto" aria-label="Directory">
                {sortedDatesList
                    .map(eachDate => (
                        <div key={eachDate} className="relative">
                            <div className="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500 flex">
                                <CalendarIcon className="h-5 w-5 text-gray-400 mx-2" aria-hidden="true" /><h3>{eachDate}</h3>
                            </div>
                            <ul role="list" className="relative z-0 divide-y divide-gray-200">
                                {dateSortedExpenses[eachDate].map((eachExpense) => (
                                    <li key={eachExpense.expenseId.N} className="bg-white">
                                        <div className="relative px-6 py-5 flex items-center space-x-3 
                                        hover:bg-gray-50 focus-within:ring-2 
                                        focus-within:ring-inset focus-within:ring-indigo-500">
                                            <div className="flex-1 min-w-0">
                                                <div className="focus:outline-none">
                                                    {/* Extend touch target to entire panel */}
                                                    <span className="absolute inset-0" aria-hidden="true" />
                                                    <p className="text-sm font-medium text-gray-900">₹ {eachExpense.expense.N}</p>
                                                    <p className="text-sm text-gray-500 truncate">{eachExpense.expenseType.S}</p>
                                                </div>

                                            </div>
                                            <div className="absolute top-6 right-0 xl:relative xl:top-auto xl:right-auto xl:self-center cursor-pointer">
                                                <div>
                                                    <div className="-m-2 flex items-center rounded-full p-2 text-red-400 hover:text-gray-600"
                                                        onClick={() => deleteExpense(eachExpense.expenseId.N)}>
                                                        <span className="sr-only">Delete Expense</span>
                                                        <TrashIcon className="h-5 w-5" aria-hidden="true" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
            </nav>
        </div>
    )
}

const mapStateToHook = (state: {
    expenses: ExpensesState;
}) => ({
    getExpensesState: state.expenses.getExpensesState
})

const ListSkeleton = ({
    broad = 3,
    inner = 3
}: { broad?: number, inner?: number }): JSX.Element => {
    return < nav className="h-full overflow-y-auto animate-pulse" aria-label="Directory">
        {
            Array(broad).fill('').map((_o, broadRepeatIndex) => <div key={broadRepeatIndex} className="relative">
                <div className="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500 flex">
                    <CalendarIcon className="h-5 w-5 text-gray-400 mx-2" aria-hidden="true" />
                    <div className="h-4 bg-slate-400 rounded">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                </div>
                <ul role="list" className="relative z-0 divide-y divide-gray-200">
                    {Array(inner).fill('').map((_i, innerRepeatIndex) => <li key={innerRepeatIndex} className="bg-white">
                        <div className="relative px-6 py-5 flex items-center space-x-3 
                                        hover:bg-gray-50 focus-within:ring-2 
                                        focus-within:ring-inset focus-within:ring-indigo-500">
                            <div className="flex-1 min-w-0">
                                <div className="focus:outline-none">
                                    {/* Extend touch target to entire panel */}
                                    <span className="absolute inset-0" aria-hidden="true" />
                                    <div className="text-sm font-medium text-gray-900 my-1 flex">
                                        <div className="h-3 bg-gray-400 rounded w-4 mr-2" />
                                        <div className="h-3 bg-gray-400 rounded w-24" />
                                    </div>
                                    <div className="text-sm text-gray-500 truncate my-1">
                                        <div className="h-3 bg-gray-400 rounded w-52" />
                                    </div>
                                </div>

                            </div>
                            <div className="absolute top-6 right-0 xl:relative xl:top-auto xl:right-auto xl:self-center">
                                <div>
                                    <div className="-m-2 flex items-center rounded-full p-2 text-gray-400">
                                        <TrashIcon className="h-5 w-5" aria-hidden="true" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>)}
                </ul>
            </div>
            )
        }
    </nav>
}

export default ListAllExpenses;