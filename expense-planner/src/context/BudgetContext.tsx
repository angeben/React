import { useReducer, createContext, ReactNode, useMemo } from "react"
import { BudgetAction, BudgetReducer, BudgetState, initialState } from "../reducers/budgetReducer"

type BudgetContextProps = {
    state: BudgetState
    dispatch: React.Dispatch<BudgetAction>,
    totalExpenses: number
    remainingBudget: number
}
type BudgetProviderProps = {
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps)

export const BudgetProvider = ({children} : BudgetProviderProps) => {

    const [state, dispatch] = useReducer(BudgetReducer, initialState)
    const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => expense.amount + total, 0), [state.expenses])
    const remainingBudget = state.budget - totalExpenses

    return (
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                totalExpenses,
                remainingBudget
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}