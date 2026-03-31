import axios from "axios";

interface DelButtonProps {
  table: string;
  id: number;
  onDeleted?: () => void; 
}

export const DelButton = ({ table, id, onDeleted }: DelButtonProps) => {

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/${table}/${id}`);
      onDeleted?.(); 
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

    return (
      <button
        onClick={handleDelete}
        className="flex-1 py-1.5 text-sm border border-red-200 text-red-600 rounded-md hover:bg-red-50"
      >
        Eliminar
      </button>
    );
};