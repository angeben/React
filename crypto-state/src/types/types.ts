import { CryptoCurrencyResponseSchema, CryptoPriceSchema, CurrencySchema, Pair } from "../schemas/cryptoSchema"
import { z } from "zod"

export type Currency = z.infer<typeof CurrencySchema>
export type Critocurrency = z.infer<typeof CryptoCurrencyResponseSchema>
export type Pair = z.infer<typeof Pair>
export type CryptoPrice = z.infer<typeof CryptoPriceSchema>