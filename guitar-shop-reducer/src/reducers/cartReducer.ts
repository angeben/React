import { db } from "../data/db";
import { Guitar, CartItem } from "../types/types";

export type CartAction = 
    { type: 'add-to-cart', payload: {item : Guitar}} | 
    { type: 'remove-from-cart', payload: {id : Guitar['id']}} | 
    { type: 'increase-quantity', payload: {id : Guitar['id']}} | 
    { type: 'decrease-quantity', payload: {id : Guitar['id']}} | 
    { type: 'clear-cart' } 

export type cartState = {
    data: Guitar[],
    cart: CartItem[]
}

const initialCart = () : CartItem[] => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
}

export const initialState: cartState = {
    data: db,
    cart: initialCart()
}

// Global variables
const MAX_ITEMS = 5
const MIN_ITEMS = 1

export const cartReducer = (
    state: cartState = initialState,
    action: CartAction
) => {
    if(action.type === 'add-to-cart'){
        const itemExists = state.cart.find((guitar) => guitar.id === action.payload.item.id);
        let updatedCart : CartItem[] = []
        if (itemExists) {
            updatedCart = state.cart.map(item => {
                if(item.id === action.payload.item.id){
                    if(item.quantity < MAX_ITEMS){
                        return {...item, quantity: item.quantity + 1}
                    } else return item
                } else {
                    return item
                }
            })
        } else {
            const newItem: CartItem = {...action.payload.item, quantity : 1}
            updatedCart = [...state.cart, newItem]
        }
        return {
            ...state,
            cart: updatedCart
        }
    }
    if(action.type === 'remove-from-cart'){
        const newCart = state.cart.filter(guitar => guitar.id !== action.payload.id)
        return {
            ...state,
            cart: newCart
        }
    }
    if(action.type === 'increase-quantity'){
        const updatedCart = state.cart.map(item => {
            if(item.id === action.payload.id && item.quantity < MAX_ITEMS){
              return {
                ...item,
                quantity: item.quantity + 1
              }
            } else return item
          })
        return {
            ...state,
            cart: updatedCart
        }
    }
    if(action.type === 'decrease-quantity'){
        const updatedCart = state.cart.map(item => {
            if(item.id === action.payload.id && item.quantity > MIN_ITEMS){
              return {
                ...item,
                quantity: item.quantity - 1
              }
            } else return item
          })
        return {
            ...state,
            cart: updatedCart
        }
    }
    if(action.type === 'clear-cart'){
        return {
            ...state,
            cart: []
        }
    }
    return state
}