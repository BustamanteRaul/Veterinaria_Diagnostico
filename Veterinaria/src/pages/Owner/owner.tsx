import OwnerCard from "../../components/Cards/OwnerCard/owner_card";
import "./owner.css";
import axios from "axios";
import type { Owner } from "../../types/owners";
import { useEffect, useState } from "react";

export default function Owner() {
  const [data, setData] = useState<Owner[]>([]);

  const fetchOwners = async () => {
    try {
      const res = await axios.get<Owner[]>("http://localhost:3000/owners", {
        withCredentials: true,
      });
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOwners();
  }, []);

  return (
    <>
      <div className="flex flex-wrap align-items-center justify-center gap-10 max-h-screen overflow-y-auto">
        {data.map((owner) => (
          <OwnerCard
            key={owner.id_owner}
            owner={owner}
            onDeleted={fetchOwners}  
            onEdited={fetchOwners}   
          />
        ))}
      </div>
    </>
  );
}
