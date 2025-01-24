import { Dispatch, useMemo } from "react"
import type { CartItem } from "../types/types"
import { CartAction } from "../reducers/cartReducer"

type HeaderProps = {
    cart : CartItem[] 
    dispatch: Dispatch<CartAction>
}

export default function Header({cart, dispatch} : HeaderProps){

    // Information derived from the state
    const cartIsEmpty = useMemo(() => cart.length === 0, [cart])
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + item.quantity * item.price, 0), [cart])
    
    return(
        <header className="py-5 header">
        <div className="container-xl">
            <div className="row justify-content-center justify-content-md-between">
                <div className="col-8 col-md-3">
                    <a href="index.html">
                        <img className="img-fluid" src="/img/logo.png" alt="Logo image" />
                    </a>
                </div>
                <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                    <div 
                        className="cart"
                    >
                        <img className="img-fluid" src="/img/cart.png" alt="Cart image" />

                        <div id="cart" className="bg-white p-3">
                            {cartIsEmpty ? 
                                <p className="text-center">Your cart is empty</p> :
                                <>
                                <table className="w-100 table">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map(guitar => (
                                        <tr key = {guitar.id}>
                                        <td>
                                            <img className="img-fluid" src={`/img/${guitar.image}.jpg`} alt="Guitar image" />
                                        </td>
                                        <td>{guitar.name}</td>
                                        <td className="fw-bold">
                                                ${guitar.price}
                                        </td>
                                        <td className="flex align-items-start gap-4">
                                            <button
                                                type="button"
                                                className="btn btn-dark"
                                                onClick={() => dispatch({type: 'decrease-quantity', payload: {id: guitar.id}})}
                                            >
                                                -
                                            </button>
                                                {guitar.quantity}
                                            <button
                                                type="button"
                                                className="btn btn-dark"
                                                onClick={() => dispatch({type: 'increase-quantity', payload:{id: guitar.id}})}
                                            >
                                                +
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-danger"
                                                type="button"
                                                onClick={() => dispatch({type: 'remove-from-cart', payload: {id: guitar.id}})}
                                            >
                                                X
                                            </button>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>                                                        
                            <p className="text-end">Total: <span className="fw-bold">${cartTotal}</span></p>
                            <button 
                                onClick={() => dispatch({type: 'clear-cart'})} 
                                className="btn btn-dark w-100 mt-3 p-2"
                            >
                                    Clear your cart</button>
                            </>
                            }
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </header>

    )
}
