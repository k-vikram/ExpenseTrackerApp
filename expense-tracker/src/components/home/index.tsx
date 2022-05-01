import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
   ChartBarIcon,
   HomeIcon,
   MenuAlt2Icon,
   RefreshIcon,
   XIcon,
   PlusIcon
} from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'
import { Link, useNavigate } from 'react-router-dom'

import ETIcon from '../../assets/etIcon.jpeg';
import { ISignInResult, signOut } from '../../actionCreators/auth'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import NewExpensePanel from './newExpense'
import { getAllExpenses } from '../../actionCreators/expenses'
import ListAllExpenses from './listExpenses'
import { AuthState } from '../../store/storeTypes'


const sidenavItems = [
   { name: 'Dashboard', to: '/home', icon: HomeIcon, current: true },
   { name: 'Reports', to: '/reports', icon: ChartBarIcon, current: false },
]
const userActivities = [
   { name: 'Sign out', to: '/auth/login' },
]

function classNames(...classes: string[]) {
   return classes.filter(Boolean).join(' ')
}

const HomePage = (): React.ReactElement | null => {

   const [sidebarOpen, setSidebarOpen] = useState(false)
   const [newExpensePanelOpen, setNewExpensePanelOpen] = useState(false);

   const navigate = useNavigate();
   const { username } = useAppSelector(MapStateToHooks)
   const dispatch = useAppDispatch();

   return (
      <>
         <div>
            <Transition.Root show={sidebarOpen} as={Fragment}>
               <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
                  <Transition.Child
                     as={Fragment}
                     enter="transition-opacity ease-linear duration-300"
                     enterFrom="opacity-0"
                     enterTo="opacity-100"
                     leave="transition-opacity ease-linear duration-300"
                     leaveFrom="opacity-100"
                     leaveTo="opacity-0"
                  >
                     <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                  </Transition.Child>
                  <Transition.Child
                     as={Fragment}
                     enter="transition ease-in-out duration-300 transform"
                     enterFrom="-translate-x-full"
                     enterTo="translate-x-0"
                     leave="transition ease-in-out duration-300 transform"
                     leaveFrom="translate-x-0"
                     leaveTo="-translate-x-full"
                  >
                     <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-indigo-700">
                        <Transition.Child
                           as={Fragment}
                           enter="ease-in-out duration-300"
                           enterFrom="opacity-0"
                           enterTo="opacity-100"
                           leave="ease-in-out duration-300"
                           leaveFrom="opacity-100"
                           leaveTo="opacity-0"
                        >
                           <div className="absolute top-0 right-0 -mr-12 pt-2">
                              <button
                                 type="button"
                                 className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                 onClick={() => setSidebarOpen(false)}
                              >
                                 <span className="sr-only">Close sidebar</span>
                                 <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                              </button>
                           </div>
                        </Transition.Child>
                        <div className="flex-shrink-0 flex items-center px-4">
                           <img
                              className="h-8 w-auto"
                              src={ETIcon}
                              alt="Pocket Change Image"
                           />
                           <span className='text-white m-2 text-2xl'>Pocket Change</span>
                        </div>
                        <div className="mt-5 flex-1 h-0 overflow-y-auto">
                           <nav className="px-2 space-y-1">
                              {sidenavItems.map((item) => (
                                 <Link
                                    key={item.name}
                                    to={item.to}
                                    className={classNames(
                                       item.current ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-600',
                                       'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                    )}
                                 >
                                    <item.icon className="mr-4 flex-shrink-0 h-6 w-6 text-indigo-300" aria-hidden="true" />
                                    {item.name}
                                 </Link>
                              ))}
                           </nav>
                        </div>
                     </div>
                  </Transition.Child>
                  <div className="flex-shrink-0 w-14" aria-hidden="true">
                     {/* Dummy element to force sidebar to shrink to fit close icon */}
                  </div>
               </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
               <div className="flex flex-col flex-grow pt-5 bg-indigo-700 overflow-y-auto">
                  <div className="flex items-center flex-shrink-0 px-4">
                     <img
                        className="h-8 w-auto"
                        src={ETIcon}
                        alt="Expense Tracker App Icon"
                     />
                     <span className='text-white m-2 text-2xl'>Pocket Change</span>
                  </div>
                  <div className="mt-5 flex-1 flex flex-col">
                     <nav className="flex-1 px-2 pb-4 space-y-1">
                        {sidenavItems.map((item) => (
                           <Link
                              key={item.name}
                              to={item.to}
                              className={classNames(
                                 item.current ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-600',
                                 'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                              )}
                           >
                              <item.icon className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300" aria-hidden="true" />
                              {item.name}
                           </Link>
                        ))}
                     </nav>
                  </div>
               </div>
            </div>
            <div className="md:pl-64 flex flex-col flex-1">
               <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
                  <button
                     type="button"
                     className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                     onClick={() => setSidebarOpen(true)}
                  >
                     <span className="sr-only">Open sidebar</span>
                     <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <div className="flex-1 px-4 flex justify-between">
                     <div className="flex-1 flex">
                     </div>
                     <div className="ml-4 flex items-center md:ml-6">
                        <Menu as="div" className="ml-3 relative">
                           <div>
                              <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                 <span className="sr-only">Open user activities menu</span>
                                 {username && <span className='not-sr-only hidden sm:block sm:mx-4 capitalize'>Hi, {username}</span>}
                                 <img
                                    className="h-8 w-8 rounded-full"
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt="user avatar"
                                 />
                              </Menu.Button>
                           </div>
                           <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                           >
                              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                 {userActivities.map((item) => (
                                    <Menu.Item key={item.name}>
                                       {({ active }: { active: boolean }) => (
                                          <div
                                             className={classNames(
                                                active ? 'bg-gray-100' : '',
                                                'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
                                             )}
                                             onClick={() => dispatch(signOut({ navigate }))}
                                          >
                                             {item.name}
                                          </div>
                                       )}
                                    </Menu.Item>
                                 ))}
                              </Menu.Items>
                           </Transition>
                        </Menu>
                     </div>
                  </div>
               </div>

               <main>
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
               </main>
            </div>
         </div >
         {newExpensePanelOpen && <NewExpensePanel
            open={newExpensePanelOpen}
            setOpen={setNewExpensePanelOpen}
         />}
      </>
   )
}


const MapStateToHooks = (state: {
   auth: AuthState;
 }) => ({
   username: (state.auth.signInState.entities?.loggedInUser as ISignInResult["loggedInUser"])?.username || ""
 })

export default HomePage;