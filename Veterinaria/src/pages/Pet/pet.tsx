import PetCard from "../../components/Cards/PetCard/pet_card";
import "./pet.css";
import axios from "axios";
import { useEffect, useState } from "react";
import type { Pet } from "../../types/pets";

export default function Pet() {
  const [data, setData] = useState<Pet[]>([]);

  const fetchPets = async () => {
    try {
      const res = await axios.get<Pet[]>(`http://localhost:3000/pets`, {
        withCredentials: true,
      });
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <>
      <div className="flex flex-wrap align-items-center justify-center gap-1 max-h-screen overflow-y-auto">
        {data.map((pet) => (
          <PetCard
            key={pet.id_pet}
            pet={pet}
            onDeleted={fetchPets}  
            onEdited={fetchPets}   
          />
        ))}
      </div>
    </>
  );
}
