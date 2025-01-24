import Header from "./components/Header.js"
import Footer from "./components/Footer.js"
import Guitar from "./components/Guitar.js"
import { useEffect, useReducer } from "react"
import { cartReducer, initialState } from "./reducers/cartReducer.js"


function App() {

  const [state, dispatch] = useReducer(cartReducer, initialState)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart))
  }, [state.cart])

  return (
    <>  
    <Header 
      cart = {state.cart}
      dispatch = {dispatch}
    />  
    <main className="container-xl mt-5">
        <h2 className="text-center">Our Guitar Collection</h2>
        
        <div className="row mt-5">
            {state.data.map((guitar) => (
                 <Guitar
                    // Unique value necessary for iterations
                    key = {guitar.id}
                    guitar = {guitar}
                    dispatch = {dispatch}
                 />
            ))}
        </div> 
        
    </main>
    <Footer />
    </>
  )
}

export default App
