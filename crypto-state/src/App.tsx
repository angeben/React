import { useEffect } from "react"
import CryptoSearchForm from "./components/CryptoSearchForm"
import { useCryptoStore } from "./store"
import CryptoPriceDispaly from "./components/CryptoPriceDispaly"

function App() {

  const fetchCryptos = useCryptoStore((state) => state.fetchCryptos)
  useEffect(() => {
    fetchCryptos()
  }, [])

  return (
    <>
      <div className="container">
        <h1 className="app-title">
          <span>Crytocurrency</span> Stock
        </h1>
        <div className="content">
          <CryptoSearchForm></CryptoSearchForm>
          <CryptoPriceDispaly></CryptoPriceDispaly>
        </div>
      </div>
    </>
  )
}

export default App
