import { useState } from "react";
import type { Pet } from "../../../types/pets";
import { DelButton } from "../../Cards/Buttons/DelButton/del_button";
import { EditButton } from "../Buttons/EditButton/edit_button";

type Props = {
  pet: Pet;
  onDeleted: () => void;
  onEdited: () => void;
};

export default function PetCard({ pet, onDeleted, onEdited }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(pet.name);
  const [species, setSpecies] = useState(pet.species);
  const [breed, setBreed] = useState(pet.breed);
  const [sex, setSex] = useState(pet.sex);
  const [birthDate, setBirthDate] = useState(pet.birth_date);
  const [weight, setWeight] = useState(pet.weight);
  const [notes, setNotes] = useState(pet.notes);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 m-6 w-96">
      {isEditing ? (
        <div className="flex flex-col gap-4">
          <input className="border border-gray-300 bg-blue-300 rounded-md px-3 py-1.5 text-sm" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="border border-gray-300 bg-blue-300 rounded-md px-3 py-1.5 text-sm" value={species} onChange={(e) => setSpecies(e.target.value)} />
          <input className="border border-gray-300 bg-blue-300 rounded-md px-3 py-1.5 text-sm" value={breed} onChange={(e) => setBreed(e.target.value)} />
          <input className="border border-gray-300 bg-blue-300 rounded-md px-3 py-1.5 text-sm" value={sex} onChange={(e) => setSex(e.target.value)} />
          <input className="border border-gray-300 bg-blue-300 rounded-md px-3 py-1.5 text-sm" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
          <input className="border border-gray-300 bg-blue-300 rounded-md px-3 py-1.5 text-sm" value={weight} onChange={(e) => setWeight(e.target.value)} />
          <input className="border border-gray-300 bg-blue-300 rounded-md px-3 py-1.5 text-sm" value={notes} onChange={(e) => setNotes(e.target.value)} />
          <EditButton
            table="pets"
            id={pet.id_pet}
            updatedData={{ name, species, breed, sex, birthDate, weight, notes }}
            onEdited={() => {
              onEdited();           
              setIsEditing(false);  
            }}
          />
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-lg">
              🐾
            </div>
            <div>
              <p className="font-semibold text-gray-900">{pet.name}</p>
              <p className="text-sm text-gray-500">{pet.species} · {pet.breed}</p>
            </div>
          </div>
    
          <div className="border-t border-gray-100 pt-3 flex flex-col gap-1">
            {[
              ["Sex", pet.sex],
              ["Birth date", pet.birth_date],
              ["Weight", `${pet.weight} kg`],
              ["Notes", pet.notes],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-gray-500">{label}:</span>
                <span className="text-gray-900 overflow-hidden whitespace-nowrap">{value}</span>
              </div>
            ))}
          </div>
    
          <div className="flex gap-2 mt-4 ">
            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Editar
            </button>
            <DelButton table="pets" id={pet.id_pet} onDeleted={onDeleted} />
          </div>
        </div>
      )}
    </div>
  );
}
