import { useState } from "react";
import ItemForm from "./ItemForm";

type Props = {
  onAdd: () => void;
};

export default function ItemFormCard({ onAdd }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`bg-white border rounded-xl shadow-sm p-4 transition-all duration-300 ease-in-out 
      ${expanded ? 'col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-2' : 'flex items-center justify-center cursor-pointer'}`}
      onClick={() => !expanded && setExpanded(true)}
    >
      {!expanded ? (
        <button className="text-blue-500 text-xl font-semibold">+ Add New Item</button>
      ) : (
        <div className="w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Add New Item</h2>
            <button
              className="text-sm text-gray-500 hover:underline"
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(false);
              }}
            >
              Cancel
            </button>
          </div>
          <ItemForm onAdd={() => {
            onAdd();
            setExpanded(false);
          }} />
        </div>
      )}
    </div>
  );
}
