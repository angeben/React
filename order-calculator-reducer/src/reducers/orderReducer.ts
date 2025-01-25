import { MenuItem, OrderItem } from "../types";

export type OrderAction = 
    { type: 'add-item', payload: {item: MenuItem}} |
    { type: 'remove-item', payload: {id: OrderItem['id']}} |
    { type: 'save-order'} |
    { type: 'add-tip', payload : {value: number}}

export type OrderState = {
    order : OrderItem[],
    tip: number
}

export const initialState = {
    order: [],
    tip: 0
}

export const orderReducer = (
    state: OrderState = initialState,
    action: OrderAction
) => {
    if(action.type === 'add-item'){
        const itemExists = state.order.find(orderItem => orderItem.id === action.payload.item.id)
        let newOrder : OrderItem[] = []
        if(itemExists){
            newOrder = state.order.map(orderItem => 
                orderItem.id === action.payload.item.id ? 
                    {...orderItem, quantity: orderItem.quantity + 1} :
                    orderItem
            )
        } else {
            const newOrderItem : OrderItem = {...action.payload.item, quantity: 1}
            newOrder = [...state.order, newOrderItem]
        }
        return {
            ...state,
            order: newOrder
        }
    }
    if(action.type === 'remove-item'){
        const newOrder = state.order.filter(orderItem => orderItem.id !== action.payload.id)
        return {
            ...state,
            order: newOrder
        }
    }
    if(action.type === 'save-order'){
        console.log(state.order)
        return {
            ...state,
            order: [],
            tip: 0
        }
    }
    if(action.type === 'add-tip'){
        const tip = action.payload.value
        return {
            ...state,
            tip
        }
    }
    return state
}