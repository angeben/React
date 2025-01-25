import { OrderAction } from "../reducers/orderReducer"
import type { MenuItem } from "../types"
type MenuItemProps = {
    item: MenuItem
    dispatch: React.Dispatch<OrderAction>
}

export default function MenuItem({item, dispatch} : MenuItemProps) {
  return (
    <button
        className="border-2 border-teal-400 hover:bg-teal-200 w-full p-3 text-lg rounded-lg flex justify-between"
        onClick={() => dispatch({type: 'add-item', payload: {item: item}})}
    >
        <p>{item.name}</p>
        <p className="font-black">${item.price}</p>
    </button>
  )
}
