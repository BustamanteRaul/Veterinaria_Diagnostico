import { useState } from "react";
import type { Visit } from "../../../types/visits";
import { DelButton } from "../../Cards/Buttons/DelButton/del_button";
import { EditButton } from "../Buttons/EditButton/edit_button";

type Props = {
  visit: Visit;
  onDeleted: () => void;
  onEdited: () => void;
};

export default function VisitCard({ visit, onDeleted, onEdited }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [id_visit, setIdVisit] = useState(visit.id_visit);
  const [pet_id, setPetId] = useState(visit.pet_id);
  const [visit_date, setVisitDate] = useState(visit.visit_date);
  const [reason, setReason] = useState(visit.reason);
  const [notes, setNotes] = useState(visit.notes);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-4 m-3 w-55">
      {isEditing ? (
        <>
          <input className="border border-gray-300 bg-pink-100 rounded-md px-3 py-1.5 text-sm" value={id_visit} onChange={(e) => setIdVisit(e.target.value)} />
          <input className="border border-gray-300 bg-pink-100 rounded-md px-3 py-1.5 text-sm" value={pet_id} onChange={(e) => setPetId(e.target.value)} />
          <input className="border border-gray-300 bg-pink-100 rounded-md px-3 py-1.5 text-sm" value={visit_date} onChange={(e) => setVisitDate(e.target.value)} />
          <input className="border border-gray-300 bg-pink-100 rounded-md px-3 py-1.5 text-sm" value={reason} onChange={(e) => setReason(e.target.value)} />
          <input className="border border-gray-300 bg-pink-100 rounded-md px-3 py-1.5 text-sm" value={notes} onChange={(e) => setNotes(e.target.value)} />
          <EditButton
            table="visit"
            id={visit.id_visit}
            updatedData={{ id_visit, pet_id, reason, notes }}
            onEdited={() => {
              onEdited();           
              setIsEditing(false);  
            }}
          />
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </>
      ) : (
        <>
          <h2>{visit.visit_date}</h2>
          <p>{visit.reason}</p>
          <DelButton table="pets" id={visit.id_visit} onDeleted={onDeleted} />
          <button onClick={() => setIsEditing(true)}>Editar</button>
        </>
      )}
    </div>
  );
}