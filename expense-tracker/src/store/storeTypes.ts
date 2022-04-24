import { IExpense } from "../actionCreators/expenses";

export type SideEffectLoadingStatus = 'idle' | 'loading' | 'pending' | 'finished' | 'error';
export type SideEffectErrorStatus = string | null;
export type SideEffectInitialStates = Record<string, unknown> | any[];

export interface SideEffectState<T> {
    loading: SideEffectLoadingStatus,
    error: SideEffectErrorStatus,
    entities: T
}

export interface AuthState {
    token?: string;
    signUpState: SideEffectState<Record<string, unknown>>;
    resendState: SideEffectState<Record<string, unknown>>;
    confirmSignUpState: SideEffectState<Record<string, unknown>>;
    signInState: SideEffectState<Record<string, unknown>>;
    userInfo: unknown;
}

export interface ExpensesState {
    newExpenseState: SideEffectState<Record<string, unknown>>;
    deleteExpenseState: SideEffectState<Record<string, unknown>>;
    getExpensesState: SideEffectState<IExpense[]>;
}

export type PayloadType = { [key: string]: unknown };