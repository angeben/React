import { useMemo } from "react";
import { formatCurrency } from "../helpers/format";
import { OrderItem } from "../types";

type OrderTotalProps = {
  order: OrderItem[];
  tip: number;
  saveOrder: () => void
};

export default function OrderTotals({ order, tip, saveOrder }: OrderTotalProps) {
  const subtotalAmount = useMemo(
    () => order.reduce((total, item) => total + item.quantity * item.price, 0),
    [order]
  );
  const tipAmount = useMemo(() => subtotalAmount * tip, [tip, order]);
  const totalAmount = useMemo(() => tipAmount + subtotalAmount, [tip, order]);

  return (
    <>
      <div className="space-y-3">
        <h2 className="font-black text-2xl">Order Total and Tip:</h2>
        <p>
          Order Amount: {""}
          <span className="font-bold"> {formatCurrency(subtotalAmount)}</span>
        </p>
        <p>
          Tip: {""}
          <span className="font-bold"> {formatCurrency(tipAmount)}</span>
        </p>
        <p>
          Order Total: {""}
          <span className="font-bold"> {formatCurrency(totalAmount)}</span>
        </p>
      </div>

      <button
        className="w-full bg-black p-3 uppercase text-white font-bold mt-10
            disabled:opacity-10"
        disabled={totalAmount === 0}
        onClick={saveOrder}
      >
        Save Order
      </button>
    </>
  );
}
