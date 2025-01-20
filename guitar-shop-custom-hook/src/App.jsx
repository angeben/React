import Header from "./components/Header"
import Footer from "./components/Footer"
import Guitar from "./components/Guitar"
import { useCart } from './hooks/useCart.js'


function App() {

  const {data, cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart,
    cartIsEmpty, cartTotal
  } = useCart()

  return (
    <>  
    <Header 
      cart = {cart}
      removeFromCart = {removeFromCart}
      increaseQuantity = {increaseQuantity}
      decreaseQuantity = {decreaseQuantity}
      clearCart = {clearCart}
      cartIsEmpty = {cartIsEmpty}
      cartTotal = {cartTotal}
    />  
    <main className="container-xl mt-5">
        <h2 className="text-center">Our Guitar Collection</h2>
        
        <div className="row mt-5">
            {data.map((guitar) => (
                 <Guitar
                    // Unique value necessary for iterations
                    key = {guitar.id}
                    guitar = {guitar}
                    addToCart = {addToCart}
                 />
            ))}
        </div> 
        
    </main>
    <Footer />
    </>
  )
}

export default App
