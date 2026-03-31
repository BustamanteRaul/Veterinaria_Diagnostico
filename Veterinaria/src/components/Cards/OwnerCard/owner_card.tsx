import { useState } from "react";
import type { Owner } from "../../../types/owners";
import { DelButton } from "../../Cards/Buttons/DelButton/del_button";
import { EditButton } from "../Buttons/EditButton/edit_button";

type Props = {
  owner: Owner;
  onDeleted: () => void;
  onEdited: () => void;
};

export default function OwnerCard({ owner, onDeleted, onEdited }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(owner.name);
  const [phone, setPhone] = useState(owner.phone);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-4 m-3 w-55">
      {isEditing ? (
        // EDIT FORM — shows when clicking Editar
        <>
          <input className="border border-gray-300 bg-amber-200 rounded-md px-3 py-1.5 text-sm" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="border border-gray-300 bg-amber-200 rounded-md px-3 py-1.5 text-sm" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <EditButton
            table="owners"
            id={owner.id_owner}
            updatedData={{ name, phone }}
            onEdited={() => {
              onEdited();           // refreshes the list in the page
              setIsEditing(false);  // closes the form
            }}
          />
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </>
      ) : (
        // DISPLAY — normal view
        <>
          <h2>{owner.name}</h2>
          <p>{owner.phone}</p>
          <DelButton table="owners" id={owner.id_owner} onDeleted={onDeleted} />
          <button onClick={() => setIsEditing(true)}>Editar</button>
        </>
      )}
    </div>
  );
}