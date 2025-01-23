import { useMemo } from "react"
import { Activity } from "../types"
import CalorieDisplay from "./CalorieDisplay"

type CalorieTrackerProps = {
    activities: Activity[]
}

export default function CalorieTracker({activities} : CalorieTrackerProps) {
  
    // Counters
    const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? 
        total + activity.calories : total, 0), [activities])
    const caloriesBurnt = useMemo(() => activities.reduce((total, activity) => activity.category === 3 ? 
        total + activity.calories : total, 0), [activities])
    const totalCalories = useMemo(() => caloriesConsumed - caloriesBurnt, [activities])
  
    return (
    <>
        <h2 className="text-4xl font-black text-white text-center">
            Summary
        </h2>
        <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CalorieDisplay
            calories={caloriesConsumed}
            text="Consumed"
        />
        <CalorieDisplay
            calories={caloriesBurnt}
            text="Exercise"
        />
        <CalorieDisplay
            calories={totalCalories}
            text="Difference"
        />
        </div>
    </>
  )
}
