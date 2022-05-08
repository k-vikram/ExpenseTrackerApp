import { Fragment, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { useAppDispatch } from '../../store/hooks'
import { addNewExpense, getAllExpenses } from '../../actionCreators/expenses'


const NewExpensePanel = ({
    open, 
    setOpen
}: {
    open: boolean
    setOpen: (open: boolean) => void
}): JSX.Element | null => {

    const dispatch = useAppDispatch();

    const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const formObjects = e.target as Record<string, any>;
        const type = (formObjects["1"] as HTMLInputElement)?.value;
        const date = (formObjects["2"] as HTMLInputElement)?.value;
        const amount = (formObjects["3"] as HTMLInputElement)?.value;

        const id = Math.ceil(Math.random() * 1000000); // Randomly generated Id
    
        dispatch(addNewExpense({ type, date, amount, id, callback: () => dispatch(getAllExpenses({})) }));
        setOpen(false);
      }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 overflow-hidden z-50" onClose={() => setOpen(false)}>
                <div className="absolute inset-0 overflow-hidden">
                    <Dialog.Overlay className="absolute inset-0" />

                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                        <Transition.Child
                            as={Fragment}
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <div className="pointer-events-auto w-screen max-w-md">
                                <form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl" onSubmit={onSubmit}>
                                    <div className="h-0 flex-1 overflow-y-auto">
                                        <div className="bg-indigo-700 py-6 px-4 sm:px-6">
                                            <div className="flex items-center justify-between">
                                                <Dialog.Title className="text-lg font-medium text-white">Create New Expense </Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <span className="sr-only">Close panel</span>
                                                        <XIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mt-1">
                                                <p className="text-sm text-indigo-300">
                                                    Add a new expense for tracking
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-1 flex-col justify-between">
                                            <div className="divide-y divide-gray-200 px-4 sm:px-6">
                                                <div className="space-y-6 pt-6 pb-5">
                                                    <div>
                                                        <label htmlFor="type" className="block text-sm font-medium text-gray-900">
                                                            {' '}
                                                            Expense Type{' '}
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                type="text"
                                                                name="type"
                                                                id="type"
                                                                required
                                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="date" className="block text-sm font-medium text-gray-900">
                                                            {' '}
                                                            Date{' '}
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                id="date"
                                                                name="date"
                                                                type="date"
                                                                required
                                                                className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="amount" className="block text-sm font-medium text-gray-900">
                                                            {' '}
                                                            Amount{' '}
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                id="date"
                                                                name="date"
                                                                type="number"
                                                                min={1} step={1}
                                                                required
                                                                className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-shrink-0 justify-end px-4 py-4">
                                        <button
                                            type="button"
                                            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            onClick={() => setOpen(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            Save Expense
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default NewExpensePanel;