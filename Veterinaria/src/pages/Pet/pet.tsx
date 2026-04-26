import PetCard from "../../components/Cards/PetCard/pet_card";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./pet.css";
import axios from "axios";
import { useEffect, useState } from "react";
import type { Pet } from "../../types/pets";

export default function Pet() {
  const [data, setData] = useState<Pet[]>([]);
  const [filtered, setFiltered] = useState<Pet[]>([]);

  const fetchPets = async () => {
    try {
      const res = await axios.get<Pet[]>("http://localhost:3000/pets", {
        withCredentials: true,
      });
      setData(res.data);
      setFiltered(res.data); // keep filtered in sync
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <div className="p-4">
      {/* Search bar */}
      <div className="mb-4">
        <SearchBar
          data={data}
          onResults={setFiltered}
          searchKeys={["name", "species", "breed"]}
          placeholder="Search by name, species or breed..."
        />
      </div>

      {/* Results count */}
      <p className="text-xs text-gray-400 mb-3">
        {filtered.length} of {data.length} pets
      </p>

      {/* Cards */}
      <div className="flex flex-wrap items-start justify-center gap-3 max-h-screen overflow-y-auto">
        {filtered.length === 0 ? (
          <p className="text-sm text-gray-500 mt-8">
            No pets match your search.
          </p>
        ) : (
          filtered.map((pet) => (
            <PetCard
              key={pet.id_pet}
              pet={pet}
              onDeleted={fetchPets}
              onEdited={fetchPets}
            />
          ))
        )}
      </div>
    </div>
  );
}
