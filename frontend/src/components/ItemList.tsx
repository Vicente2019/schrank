import { Item } from "../types/item";
import ItemCard from "./ItemCard";

type Props = {
  items: Item[];
  refreshItems: () => void;
};

export default function ItemList({ items, refreshItems }: Props) {
  return (
    <>
      {items.map((item) => (
        <ItemCard key={item._id} item={item} refreshItems={refreshItems}/>
      ))}
    </>
  );
}
