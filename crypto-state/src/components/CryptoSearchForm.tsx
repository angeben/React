import { useState } from "react"
import { currencies } from "../data/data"
import { useCryptoStore } from "../store"
import { Pair } from "../types/types"
import ErrorMessage from "./ErrorMessage"

export default function CryptoSearchForm() {

  const cryptocurrencies = useCryptoStore((state) => state.cryptocurrencies)
  const fetchData = useCryptoStore((state) => state.fetchData)
  const [pair, setPair] = useState<Pair>({
    currency: '',
    cryptocurrency: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPair({
        ...pair,
        [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(Object.values(pair).includes('')){
        setError('All fields must be provided')
        return
    }
    setError('')
    fetchData(pair)
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div className="field">
            <label htmlFor="currency">Currency:</label>
            <select
                name="currency"
                id="currency"
                onChange={handleChange}
                value={pair.currency}
            >
                <option value ="">-- Select --</option>
                {currencies.map(currency => (
                    <option key={currency.code} value={currency.code}>{currency.name}</option>
                ))}
            </select>
        </div>

        <div className="field">
            <label htmlFor="cryptocurrency">Cryptocurrency:</label>
            <select
                name="cryptocurrency"
                id="cryptocurrency"
                onChange={handleChange}
                value={pair.cryptocurrency}
            >
                <option value ="">-- Select --</option>
                {cryptocurrencies.map(crypto => (
                    <option 
                        key={crypto.CoinInfo.Name}
                        value={crypto.CoinInfo.Name}
                    >{crypto.CoinInfo.FullName}</option>
                ))}
            </select>
        </div>

        <input type="submit" value="Check"></input>
    </form>
  )
}
