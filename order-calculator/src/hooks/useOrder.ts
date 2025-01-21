import { useState } from "react"
import type { MenuItem, OrderItem } from "../types"

export default function useOrder(){

    const [order, setOrder] = useState<OrderItem[]>([])
    const [tip, setTip] = useState(0)
    
    
    const addItem = (item : MenuItem) => {
        const itemExists = order.find(orderItem => orderItem.id === item.id)
        if(itemExists){
            const newOrder = order.map(orderItem => 
                orderItem.id === item.id ? 
                    {...orderItem, quantity: orderItem.quantity + 1} :
                    orderItem
            )
            setOrder(newOrder)
        } else {
            const newOrderItem = {...item, quantity: 1}
            setOrder([...order, newOrderItem])
        }
    }

    const removeItem = (id: OrderItem['id']) => {
        setOrder(order.filter(orderItem => orderItem.id !== id) )
    }

    const saveOrder = () => {
        console.log(order)
        setOrder([])
        setTip(0)
    }

    return {
        order,
        tip,
        setTip,
        addItem,
        removeItem,
        saveOrder
    }
}