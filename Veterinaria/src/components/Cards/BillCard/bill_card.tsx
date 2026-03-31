import { useState } from "react";
import type { Bill } from "../../../types/bills";
import { DelButton } from "../../Cards/Buttons/DelButton/del_button";
import { EditButton } from "../Buttons/EditButton/edit_button";

type Props = {
  bill: Bill;
  onDeleted: () => void;
  onEdited: () => void;
};

export default function BillCard({ bill, onDeleted, onEdited }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [id_payment, setIdPayment] = useState(bill.id_payment);
  const [visit_id, setVisitId] = useState(bill.visit_id);
  const [amount, setAmount] = useState(bill.amount);
  const [payment_date, setPaymentDate] = useState(bill.payment_date);
  const [paid, setPaid] = useState(bill.paid);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-4 m-3 w-55">
      {isEditing ? (
        <>
          <input className="border border-gray-300 bg-green-100 rounded-md px-3 py-1.5 text-sm" value={id_payment} onChange={(e) => setIdPayment(e.target.value)} />
          <input className="border border-gray-300 bg-green-100 rounded-md px-3 py-1.5 text-sm" value={visit_id} onChange={(e) => setVisitId(e.target.value)} />
          <input className="border border-gray-300 bg-green-100 rounded-md px-3 py-1.5 text-sm" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <input className="border border-gray-300 bg-green-100 rounded-md px-3 py-1.5 text-sm" value={payment_date} onChange={(e) => setPaymentDate(e.target.value)} />
          <input className="border border-gray-300 bg-green-100 rounded-md px-3 py-1.5 text-sm" value={paid} onChange={(e) => setPaid(e.target.value)} />
          <EditButton
            table="billing"
            id={bill.id_payment}
            updatedData={{ id_payment, visit_id, amount, payment_date, paid }}
            onEdited={() => {
              onEdited();           
              setIsEditing(false);  
            }}
          />
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </>
      ) : (
        <>
          <h2>{bill.id_payment}</h2>
          <p>{bill.paid}</p>
          <DelButton table="billing" id={bill.id_payment} onDeleted={onDeleted} />
          <button onClick={() => setIsEditing(true)}>Editar</button>
        </>
      )}
    </div>
  );
}