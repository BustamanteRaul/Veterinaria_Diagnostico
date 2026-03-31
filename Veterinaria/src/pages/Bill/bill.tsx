import BillCard from "../../components/Cards/BillCard/bill_card";
import "./bill.css";
import axios from "axios";
import type { Bill } from "../../types/bills";
import { useEffect, useState } from "react";

export default function Bill() {
  const [data, setData] = useState<Bill[]>([]);

  const fetchBills = async () => {
    try {
      const res = await axios.get<Bill[]>("http://localhost:3000/bills", {
        withCredentials: true,
      });
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  return (
    <>
      <div className="flex flex-wrap align-items-center justify-center gap-10 max-h-screen overflow-y-auto">
        {data.map((bill) => (
          <BillCard
            key={bill.id_payment}
            bill={bill}
            onDeleted={fetchBills}  
            onEdited={fetchBills}   
          />
        ))}
      </div>
    </>
  );
}
