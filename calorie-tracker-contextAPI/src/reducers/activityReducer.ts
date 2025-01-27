import { Activity } from "../types"

export type ActivityActions = 
    {type: 'save-activity', payload: {newActivity : Activity}} |
    {type: 'set-activeId', payload: {id : Activity['id']}} |
    {type: 'remove-activity', payload: {id : Activity['id']}} |
    {type: 'restart-app'}

export type ActivityState = {
    activities : Activity[],
    activeID: Activity['id']
}

const localStorageActivities = () : Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

export const initialState : ActivityState = {
    activities : localStorageActivities(),
    activeID: ''
}

export const activityReducer = (
        state: ActivityState = initialState,
        action: ActivityActions
    ) => {
    if(action.type === 'save-activity'){
        // Logic to update state
        let updatedActivities : Activity[] = []
        if(state.activeID){ // An activity is being edited
            updatedActivities = state.activities.map(activity => activity.id === state.activeID ? action.payload.newActivity : activity)
        } else {
            updatedActivities = [...state.activities, action.payload.newActivity]
        }
        return {
            ...state,
            activities: updatedActivities,
            activeID: ''
        }
    }
    if(action.type === 'set-activeId'){
        return {
            ...state,
            activeID: action.payload.id
        }
    }
    if(action.type === 'remove-activity'){
        return {
            ...state,
            activities: state.activities.filter(activity => activity.id !== action.payload.id)
        }
    }
    if(action.type === 'restart-app'){
        return {
            activities: [],
            activeID: ''
        }
    }
    return state
}