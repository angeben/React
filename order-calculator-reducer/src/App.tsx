import { useReducer } from "react"
import MenuItem from "./components/MenuItem"
import OrderContents from "./components/OrderContents"
import OrderTotals from "./components/OrderTotals"
import TipForm from "./components/TipForm"
import { menuItems } from "./data/db"
import { initialState, orderReducer } from "./reducers/orderReducer"

function App() {

  const [state, dispatch] = useReducer(orderReducer, initialState)

  return (
    <>
      <header className="bg-teal-400 py-5">
        <h1 className="text-center text-4xl font-black">Order and Tip Calculator</h1>
      </header>

      <main className="max-w-7xl mx-auto py-20 grid md:grid-cols-2">
        <div className="p-5">
          <h2 className="text-4xl font-black">Menu</h2>
          <div className="space-y-3 mt-10">
            {menuItems.map(item =>(
              <MenuItem
                key={item.id}
                item={item}
                dispatch={dispatch}
              />
            ))}
          </div>
        </div>

        <div className="border border-dashed border-slate-300 p-5 rounded-lg space-y-10">
            {state.order.length > 0 ? (
              <>
                <OrderContents
                order={state.order}
                dispatch={dispatch}
                />
                <TipForm
                  dispatch={dispatch}
                  tip={state.tip}
                />
                <OrderTotals
                  order={state.order}
                  tip={state.tip}
                  dispatch={dispatch}
                />
              </>
            ) : (<p className="text-center">The order is empty</p>)} 
        </div>
      </main>

      <footer className="bg-teal-600 py-5 grid md:grid-cols-2">
        <a href="https://www.linkedin.com/in/angel-benitez-gomez/" className="text-center text-2xl font-black">Check out my LinkedIn</a>
        <a href="https://github.com/angeben" className="text-center text-2xl font-black">Check out my Github</a>
      </footer>

    </>
  )
}

export default App
