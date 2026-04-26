import OwnerCard from "../../components/Cards/OwnerCard/owner_card";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./owner.css";
import axios from "axios";
import { useEffect, useState } from "react";
import type { Owner } from "../../types/owners";

export default function Owner() {
  const [data, setData] = useState<Owner[]>([]);
  const [filtered, setFiltered] = useState<Owner[]>([]);

  const fetchOwners = async () => {
    try {
      const res = await axios.get<Owner[]>("http://localhost:3000/owners", {
        withCredentials: true,
      });
      setData(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOwners();
  }, []);

  return (
    <div className="p-4">
      <div className="mb-4">
        <SearchBar
          data={data}
          onResults={setFiltered}
          searchKeys={["name", "phone"]}
          placeholder="Search by name or phone..."
        />
      </div>

      <p className="text-xs text-gray-400 mb-3">
        {filtered.length} of {data.length} owners
      </p>

      <div className="flex flex-wrap items-start justify-center gap-3 max-h-screen overflow-y-auto">
        {filtered.length === 0 ? (
          <p className="text-sm text-gray-500 mt-8">
            No owners match your search.
          </p>
        ) : (
          filtered.map((owner) => (
            <OwnerCard
              key={owner.id_owner}
              owner={owner}
              onDeleted={fetchOwners}
              onEdited={fetchOwners}
            />
          ))
        )}
      </div>
    </div>
  );
}
