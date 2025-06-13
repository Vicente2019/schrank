import { Item } from "../../types/item";
import ItemCard from "./ItemCard";

type Props = {
  items: Item[];
  refreshItems: () => void;
  onToggleSelect?: (id: string) => void;
  selectedIds?: string[];
};

export default function ItemList({ items, refreshItems, onToggleSelect, selectedIds = [] }: Props) {
  return (
    <>
      {items.map((item) => (
        <ItemCard
          key={item._id}
          item={item}
          refreshItems={refreshItems}
          onToggleSelect={onToggleSelect}
          selected={selectedIds.includes(item._id)}
        />
      ))}
    </>
  );
}
