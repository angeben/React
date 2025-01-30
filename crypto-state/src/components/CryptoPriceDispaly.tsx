import { useMemo } from "react"
import { useCryptoStore } from "../store"
import Spinner from "./Spinner"


export default function CryptoPriceDispaly() {

    const result = useCryptoStore((state) => state.result)
    const loading = useCryptoStore((state) => state.loading)
    const hasResult = useMemo(() => !Object.values(result).includes(''), [result])

    return (
        <div className="result-wrapper">
            {loading ? <Spinner/> : hasResult && (
                <>
                    <h2>Stock</h2>
                    <div className="result">
                        <img src={`https://cryptocompare.com/${result.IMAGEURL}`}/>
                        <div>
                            <p>Current price: <span>{result.PRICE}</span></p>
                            <p>The highest price today was: <span>{result.HIGHDAY}</span></p>
                            <p>The lowest price today was: <span>{result.LOWDAY}</span></p>
                            <p>Variation in last 24h: <span>{result.CHANGEPCT24HOUR}</span></p>
                            <p>Last update: <span>{result.LASTUPDATE}</span></p>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
