import { Item } from "../types/item";

type Props = {
  item: Item;
  refreshItems: () => void;
};

export default function ItemCard({ item, refreshItems }: Props) {
  const handleDelete = async () => {
    await fetch(`http://localhost:5050/api/items/${item._id}`, {
      method: "DELETE",
    });
    refreshItems();
  };

  return (
    <div className="relative bg-white rounded-xl shadow-md p-4 border border-gray-200 flex flex-col">

      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-100 transition-colors"
      >
        Delete
      </button>

      <h3 className="font-semibold">{item.name}</h3>
      <p className="text-sm text-gray-600">Category: {item.category}</p>
      {item.brand && <p className="text-sm text-gray-600">Brand: {item.brand}</p>}
      {item.size && <p className="text-sm text-gray-600">Size: {item.size}</p>}
      {item.color && <p className="text-sm text-gray-600">Color: {item.color}</p>}
      {item.price !== undefined && (
        <p className="text-sm text-gray-600">Price: ${item.price.toFixed(2)}</p>
      )}
      {item.tags?.length > 0 && (
        <div className="mt-auto pt-2 flex flex-wrap gap-1 text-xs text-blue-600">
          {item.tags.map((tag) => (
            <span key={tag} className="bg-blue-100 px-2 py-0.5 rounded">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
