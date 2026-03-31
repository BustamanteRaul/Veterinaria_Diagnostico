import axios from "axios";

interface EditButtonProps<T> {
  table: string;
  id: number;
  updatedData: T;        
  onEdited?: () => void;
}

export const EditButton = <T,>({ table, id, updatedData, onEdited }: EditButtonProps<T>) => {
  const handleEdit = async () => {
    try {
      console.log(updatedData)
      await axios.put(`http://localhost:3000/${table}/${id}`, updatedData);
      onEdited?.();
    } catch (error) {
      console.error("Error editing:", error);
    }
  };

  return (
    <button onClick={handleEdit}
      className="flex-1 py-1.5 text-sm border border-red-200 text-red-600 rounded-md hover:bg-red-50"
    >Editar</button>
  );
};