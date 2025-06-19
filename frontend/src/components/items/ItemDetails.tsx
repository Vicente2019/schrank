import { Item } from "../../types/item";
import Tag from "../tags/Tag";

type Props = {
  item: Item;
  onDelete: () => void;
};

export default function ItemDetails({ item, onDelete }: Props) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{item.name}</h1>
      <div className="flex flex-wrap gap-2 mt-3">
        {item.tags.map((tag, index) => (
          <Tag tag={{value: tag, index: index}}/>
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
      <div className="mt-6">
        <button
          onClick={onDelete}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
        >
          Delete Item
        </button>
      </div>
    </div>
  );
}