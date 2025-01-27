import { useMemo } from "react"
import { categories } from "../data/categories"
import { Expense } from "../types/types"
import { formatDate } from "../utils"
import AmountDispaly from "./AmountDispaly"
import { LeadingActions, SwipeableList, SwipeableListItem,
    SwipeAction, TrailingActions} from "react-swipeable-list"
import "react-swipeable-list/dist/styles.css"
import { useBudget } from "../hooks/useBudget"

type ExpenseDetailsProps = {
    expense: Expense
}

export default function ExpenseDetails({expense} : ExpenseDetailsProps) {
  
    const categoryInfo = useMemo(() => categories.filter(cat => cat.id === expense.category), [expense])[0]
  
    const {dispatch} = useBudget()

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => dispatch({type: 'get-expense-by-id', payload: {id: expense.id}})}>
                Update
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction onClick={() => dispatch({type: 'remove-expense', payload: {id: expense.id}})} destructive={true}>
                Delete
            </SwipeAction>
        </TrailingActions>
    )

    return (
      <SwipeableList>
        <SwipeableListItem
            maxSwipe={1}
            leadingActions={leadingActions()}
            trailingActions={trailingActions()}
        >
        <div className="bg-white shadow-lg p-5 w-full rounded-lg border-b border-gray-200 flex gap-5 items-center">
          <div>
            <img
              src={`/icon_${categoryInfo.icon}.svg`}
              alt="Icon"
              className="w-20"
            />
          </div>
          <div className="flex-1 space-y-2">
            <p className="text-sm font-bold uppercase text-slate-500">
              {categoryInfo.name}
            </p>
            <p>{expense.expenseName}</p>
            <p className="text-slate-600 text-sm">
              {formatDate(expense.date!.toString())}
            </p>
          </div>
          <AmountDispaly amount={expense.amount} />
        </div>
        </SwipeableListItem>        
      </SwipeableList>
    );
}
