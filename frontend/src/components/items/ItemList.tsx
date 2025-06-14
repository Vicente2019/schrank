import { Item } from "../../types/item";
import ItemCard from "./ItemCard";

type Props = {
  items: Item[];
  refreshItems?: () => void;
  onClick?: (item: Item) => void;
  selectedIds?: string[];
};

export default function ItemList({ items, refreshItems, onClick, selectedIds = [] }: Props) {
  return (
    <>
      {items.map((item) => (
        <ItemCard
          key={item._id}
          item={item}
          refreshItems={refreshItems}
          onClick={onClick}
          selected={selectedIds.includes(item._id)}
        />
      ))}
    </>
  );
}
