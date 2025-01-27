import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetails from "./ExpenseDetails"

export default function ExpenseList() {
  const { state } = useBudget()

  const filteredExpenses = state.currentCategory
    ? state.expenses.filter(
        (expense) => expense.category === state.currentCategory
      )
    : state.expenses

  const isEmpty = useMemo(() => filteredExpenses.length === 0, [filteredExpenses])

  return (
    <div className="mt-10">
      {isEmpty ? (
        <p className="text-gray-600 text-2xl font-bold">
          No expenses added yet
        </p>
      ) : (
        <>
          <p className="text-gray-600 text-2xl font-bold my-5">Expense List</p>
          {filteredExpenses.map((expense) => (
            <ExpenseDetails key={expense.id} expense={expense} />
          ))}
        </>
      )}
    </div>
  )
}
