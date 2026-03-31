import VisitCard from "../../components/Cards/VisitCard/visit_card";
import "./visit.css";
import axios from "axios";
import { useEffect, useState } from "react";
import type { Visit } from "../../types/visits";

export default function Visit() {
  const [data, setData] = useState<Visit[]>([]);

  const fetchVisits = async () => {
    try {
      const res = await axios.get<Visit[]>(`http://localhost:3000/visits`, {
        withCredentials: true,
      });
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVisits();
  }, []);

  return (
    <>
      <div className="flex flex-wrap align-items-center justify-center gap-10 max-h-screen overflow-y-auto">
        {data.map((visit) => (
          <VisitCard
            key={visit.id_visit}
            visit={visit}
            onDeleted={fetchVisits}  
            onEdited={fetchVisits}   
          />
        ))}
      </div>
    </>
  );
}
