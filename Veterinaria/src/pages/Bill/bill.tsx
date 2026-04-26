import BillCard from "../../components/Cards/BillCard/bill_card";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./bill.css";
import axios from "axios";
import { useEffect, useState } from "react";
import type { Bill } from "../../types/bills";

export default function Bill() {
  const [data, setData] = useState<Bill[]>([]);
  const [filtered, setFiltered] = useState<Bill[]>([]);

  const fetchBills = async () => {
    try {
      const res = await axios.get<Bill[]>("http://localhost:3000/bills", {
        withCredentials: true,
      });
      setData(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  return (
    <div className="p-4">
      <div className="mb-4">
        <SearchBar
          data={data}
          onResults={setFiltered}
          searchKeys={["visit_id", "amount", "paid"]}
          placeholder="Search by amount or status..."
        />
      </div>

      <p className="text-xs text-gray-400 mb-3">
        {filtered.length} of {data.length} bills
      </p>

      <div className="flex flex-wrap items-start justify-center gap-3 max-h-screen overflow-y-auto">
        {filtered.length === 0 ? (
          <p className="text-sm text-gray-500 mt-8">
            No bills match your search.
          </p>
        ) : (
          filtered.map((bill) => (
            <BillCard
              key={bill.id_payment}
              bill={bill}
              onDeleted={fetchBills}
              onEdited={fetchBills}
            />
          ))
        )}
      </div>
    </div>
  );
}
