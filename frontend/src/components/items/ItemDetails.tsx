import { useState } from "react";
import { Item } from "../../types/item";
import Tag from "../tags/Tag";
import ItemForm from "./ItemForm";
import { updateItem } from "../../services/itemService";

type Props = {
  item: Item;
  onDelete: () => void;
  onUpdate: (updated: Item) => void;
};

export default function ItemDetails({ item, onDelete, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = async (formData: FormData) => {
    console.log(formData.get("price"));
    updateItem(formData, item._id)
      .then((updated: Item) => {
        onUpdate(updated);
        setIsEditing(false);
      })    
      .catch(console.error);
  }

  return (
    <div>
      {isEditing ? (
        <div className="space-y-4">
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <ItemForm
            initalData={item}
            onSubmit={handleUpdate}
            submitLabel="Update Item"
          />
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-2 mt-3">
            {item.tags.map((tag, index) => (
              <Tag key={index} tag={{ value: tag, index }} />
            ))}
          </div>
          <div className="space-y-2 text-gray-700 mt-4 bg-neutral-100 rounded-xl p-4">
            {item.category && <p><strong>Category:</strong> {item.category}</p>}
            {item.brand && <p><strong>Brand:</strong> {item.brand}</p>}
            {item.size && <p><strong>Size:</strong> {item.size}</p>}
            {item.price !== undefined && (
              <p><strong>Price:</strong> ${item.price.toFixed(2)}</p>
            )}
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}