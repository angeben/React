import { Dispatch } from "react"
import { OrderAction } from "../reducers/orderReducer"

const tipOptions = [
    {
      id: 'tip-10',
      value: .10,
      label: '10%'
    },
    {
      id: 'tip-20',
      value: .20,
      label: '20%'
    },
    {
      id: 'tip-50',
      value: .50,
      label: '50%'
    },
  ]

type TipFormProps = {
    dispatch: Dispatch<OrderAction>
    tip: number
}

export default function TipForm({dispatch, tip} : TipFormProps) {
  return (
    <div>
        <h3 className="font-black text-2xl">Tip:</h3>
        <form>
            {tipOptions.map(tipOption => (
                <div key={tipOption.id} className="flex gap-2">
                    <label htmlFor="">{tipOption.label}</label>
                    <input
                        id={tipOption.id}
                        type="radio"
                        name="tip"
                        value={tipOption.value}
                        onChange={e => dispatch({type: 'add-tip', payload: {value: +e.target.value}})}
                        checked={tipOption.value === tip}
                    />
                </div>
            ))}
        </form>
    </div>
  )
}
