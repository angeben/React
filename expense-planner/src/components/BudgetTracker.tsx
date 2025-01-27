import { useBudget } from "../hooks/useBudget";
import AmountDispaly from "./AmountDispaly";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"

export default function BudgetTracker() {

  const { state, dispatch, totalExpenses, remainingBudget } = useBudget()

  const percentage = +((totalExpenses / state.budget) * 100).toFixed(2)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex justify-center">
            <CircularProgressbar
                value={percentage}
                styles={buildStyles({
                    pathColor: percentage > 95 ? '#dc2626' : '#3b82f6',
                    trailColor: '#F5F5F5',
                    textSize: 20,
                    textColor: percentage > 95 ? '#dc2626' : '#3b82f6'
                })}
                text={`${percentage}%`}
            />
        </div>
        <div className="flex flex-col justify-center items-center gap-8">
            <button
                type="button"
                className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
                onClick={() => dispatch({type: 'reset-app'})}
            >
                Reset App
            </button>
            <AmountDispaly
                label="Budget"
                amount={state.budget}
            />
            <AmountDispaly
                label="Available"
                amount={remainingBudget}
            />
            <AmountDispaly
                label="Spent"
                amount={totalExpenses}
            />
        </div>
    </div>
  )
}
