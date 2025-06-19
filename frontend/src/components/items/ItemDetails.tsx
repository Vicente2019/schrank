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
        <ItemForm
          initalData={item}
          onSubmit={handleUpdate}
          submitLabel="Update Item"
        />
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-4">{item.name}</h1>
          <div className="flex flex-wrap gap-2 mt-3">
            {item.tags.map((tag, index) => (
              <Tag key={index} tag={{ value: tag, index }} />
            ))}
          </div>
          <div className="space-y-2 text-gray-700 mt-4">
            <p><strong>Category:</strong> {item.category}</p>
            {item.brand && <p><strong>Brand:</strong> {item.brand}</p>}
            {item.size && <p><strong>Size:</strong> {item.size}</p>}
            {item.color && <p><strong>Color:</strong> {item.color}</p>}
            {item.price !== undefined && (
              <p><strong>Price:</strong> ${item.price.toFixed(2)}</p>
            )}
          </div>
          <div className="mt-6 flex gap-2">
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