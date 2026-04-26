import VisitCard from "../../components/Cards/VisitCard/visit_card";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./visit.css";
import axios from "axios";
import { useEffect, useState } from "react";
import type { Visit } from "../../types/visits";

export default function Visit() {
  const [data, setData] = useState<Visit[]>([]);
  const [filtered, setFiltered] = useState<Visit[]>([]);

  const fetchVisits = async () => {
    try {
      const res = await axios.get<Visit[]>("http://localhost:3000/visits", {
        withCredentials: true,
      });
      setData(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVisits();
  }, []);

  return (
    <div className="p-4">
      <div className="mb-4">
        <SearchBar
          data={data}
          onResults={setFiltered}
          searchKeys={["reason", "notes"]}
          placeholder="Search by reason or notes..."
        />
      </div>

      <p className="text-xs text-gray-400 mb-3">
        {filtered.length} of {data.length} visits
      </p>

      <div className="flex flex-wrap items-start justify-center gap-3 max-h-screen overflow-y-auto">
        {filtered.length === 0 ? (
          <p className="text-sm text-gray-500 mt-8">
            No visits match your search.
          </p>
        ) : (
          filtered.map((visit) => (
            <VisitCard
              key={visit.id_visit}
              visit={visit}
              onDeleted={fetchVisits}
              onEdited={fetchVisits}
            />
          ))
        )}
      </div>
    </div>
  );
}
