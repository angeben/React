
import { formatCurrency } from "../utils"

type AmountDispalyProps = {
    label?: string,
    amount: number
}

export default function AmountDispaly({label, amount} : AmountDispalyProps) {
  return (
    <p className="text-2xl text-blue-600 font-bold">
        {label && `${label}: `}
        <span className="font-black text-black">{formatCurrency(amount)}</span>
    </p>
  )
}
