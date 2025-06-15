import { Item } from "../../types/item";
import ItemCard from "./ItemCard";

type Props = {
  items: Item[];
  onClick?: (item: Item) => void;
  selectedIds?: string[];
};

export default function ItemList({ 
  items, 
  onClick, 
  selectedIds = [],
 }: Props) {
  return (
    <>
      {items.map((item) => (
        <ItemCard
          key={item._id}
          item={item}
          onClick={onClick}
          selected={selectedIds.includes(item._id)}
        />
      ))}
    </>
  );
}
