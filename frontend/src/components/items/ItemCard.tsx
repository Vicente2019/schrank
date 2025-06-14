import { Item } from "../../types/item";
import * as itemService from "../../services/itemService";
import { useEffect } from "react";

type Props = {
  item: Item;
  refreshItems?: () => void;
  onClick?: (item: Item) => void;
  selected?: boolean;
};

export default function ItemCard({ item, refreshItems, onClick, selected }: Props) {
  const handleDelete = () => itemService.deleteItem(item._id).then(refreshItems);

  return (
    <div
      onClick={() => onClick?.(item)}
      className={`relative rounded-xl border p-4 shadow-sm flex flex-col transition cursor-pointer ${
        selected ? "ring-2 ring-blue-500 bg-blue-50" : "bg-white"
      }`}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDelete();
        }}
        className="absolute top-2 right-2 p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-100 transition-colors"
      >
        Delete
      </button>
      {item.image && (
        <img
          src={item.image.url}
          alt={item.name}
          className="w-full h-64 object-cover"
        />
      )}
    </div>
  );
}
