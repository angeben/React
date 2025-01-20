// Custom hook for cart logic
import { useState, useEffect, useMemo } from 'react'
import { db } from "../data/db.js"

export const useCart = () => {
    // Data State
  const [data] = useState(db)
  // Cart State
  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }
  const [cart, setCart] = useState(initialCart)

  // Automatically runs when dependencies(cart) change
  useEffect(() =>{
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // Global variables
  const MAX_ITEMS = 5
  const MIN_ITEMS = 1
  
  function addToCart(item){
    // Only use methods that do not mutate the state
    const itemIndex = cart.findIndex(guitar => guitar.id === item.id)
    if(itemIndex === -1) { // Not in the cart
      item.quantity = 1
      setCart(prevCart => [...prevCart, item])
    } else if(cart[itemIndex].quantity < MAX_ITEMS){
      // Copy of the cart to not mutate the state
      const updatedCart = [...cart]
      updatedCart[itemIndex].quantity++
      setCart(updatedCart)
    }
  }

  function removeFromCart(id){
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  function increaseQuantity(id){
    const updatedCart = cart.map(item => {
      if(item.id === id && item.quantity < MAX_ITEMS){
        return {
          ...item,
          quantity: item.quantity + 1
        }
      } else return item
    })
    setCart(updatedCart)
  }

  function decreaseQuantity(id){
    const updatedCart = cart.map(item => {
      if(item.id === id && item.quantity > MIN_ITEMS){
        return {
          ...item,
          quantity: item.quantity - 1
        }
      } else return item
    })
    setCart(updatedCart)
  }

  function clearCart(){
    setCart([])
  }

    // Information derived from the state
    const cartIsEmpty = useMemo(() => cart.length === 0, [cart])
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + item.quantity * item.price, 0), [cart])

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    cartIsEmpty,
    cartTotal
  }
}

