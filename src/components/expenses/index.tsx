import { useState } from 'react'
import {
    RefreshIcon,
    PlusIcon
} from '@heroicons/react/outline'

import { useAppDispatch } from '../../store/hooks'
import NewExpensePanel from './newExpense'
import { getAllExpenses } from '../../actionCreators/expenses'
import ListAllExpenses from './listExpenses'


const Expenses = (): JSX.Element | null => {

    const [newExpensePanelOpen, setNewExpensePanelOpen] = useState(false);
    const dispatch = useAppDispatch();

    return <>
        <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col sm:flex-row items-center justify-between ">
                <h1 className="text-2xl font-semibold text-gray-900">My Expenses</h1>
                <div className='flex items-center justify-between'>
                    <div className="h-6 w-6 hover:text-indigo-600 hover:cursor-pointer mx-1"
                        onClick={() => dispatch(getAllExpenses({}))}>
                        <RefreshIcon aria-hidden="true" />
                    </div>
                    <div className="h-6 w-6 hover:text-indigo-600 hover:cursor-pointer mx-1"
                        onClick={() => setNewExpensePanelOpen(true)}>
                        <PlusIcon aria-hidden="true" />
                    </div>
                </div>

            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="py-4">
                    <ListAllExpenses />
                </div>
            </div>
        </div>
        {newExpensePanelOpen && <NewExpensePanel
            open={newExpensePanelOpen}
            setOpen={setNewExpensePanelOpen}
         />}
    </>
}

export default Expenses;